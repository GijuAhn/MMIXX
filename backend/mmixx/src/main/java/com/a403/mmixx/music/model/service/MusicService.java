package com.a403.mmixx.music.model.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import javax.transaction.Transactional;

import com.a403.mmixx.music.model.dto.*;
import com.mpatric.mp3agic.ID3v2;
import com.mpatric.mp3agic.InvalidDataException;
import com.mpatric.mp3agic.Mp3File;
import com.mpatric.mp3agic.UnsupportedTagException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.entity.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository musicRepository;
	private final AwsS3Service awsS3Service;

	public Page<MusicListResponseDto> getMusicList(Pageable pageable) {
		return musicRepository.findAll(pageable).map(MusicListResponseDto::new);
	}

	public Page<MusicListResponseDto> getMusicListByCondition(MusicCondition condition, Pageable pageable) {
		return musicRepository.getMusicListByCondition(condition, pageable);
	}

	public MusicDetailResponseDto getMusic(Integer seq) {
		Music music = musicRepository.findById(seq)
				.orElseThrow(() -> new IllegalArgumentException("해당 음악은 없습니다. 방 ID: " + seq)); // error code: 500
		return new MusicDetailResponseDto(music);
	}

	@Transactional
	public Music updateMusic(Integer seq, MusicUpdateRequestDto requestDto) {
		Music music = musicRepository.findById(seq).orElse(null);
		if (music != null) {
			music.updateMusic(requestDto);
		}
		return music;
	}

	@Transactional
	public Music deleteMusic(Integer seq) {
		Music music = musicRepository.findById(seq).orElse(null);
		if (music != null) {
			musicRepository.deleteById(seq);
		}
		return music;
	}

	public List<Music> registMusic(List<MultipartFile> multipartFiles) {
//		TODO: S3 에 원본 음원 + 커버 이미지 업로드
//		TODO: EC2 DB에 저장하는 로직 추가
		List<Music> musicContainerList = new ArrayList<>();
		musicContainerList = uploadMusicAndArtworkWithMetadata(multipartFiles);
		System.out.println("musicContainerList: " + musicContainerList);
		return musicContainerList;
	}


	//	Extract Metadata from ID3v2 format and music + cover image upload to S3
	public List<Music> uploadMusicAndArtworkWithMetadata(List<MultipartFile> multipartFiles) {

		List<String> musicUrlList;
		List<String> coverImageList;
		List<Music> musicContainerList = new ArrayList<>();

		musicUrlList = awsS3Service.uploadMusicToS3(multipartFiles);
		coverImageList = awsS3Service.uploadCoverImageToS3(multipartFiles);

		multipartFiles.forEach(file -> {

//			TODO: file 그대로 extractMetadata 에 넣으면 '파일을 찾을 수 없습니다' 에러 발생. inputstream 처럼 한번쓰고 휘발되는 문제인가?

			Music musicContainer;
			MP3MetadataService mp3MetadataService = new MP3MetadataService();
			try {
				musicContainer = new Music();

				Map<String, String> metadataMap = mp3MetadataService.extractMetadata(file);

				String musicName = metadataMap.get("musicName");
				String musicUrl = "";
				String coverImage = "";
				int musicLength = Integer.parseInt(metadataMap.get("musicLength"));
				String musicianName = metadataMap.get("musicianName");
				String albumName = metadataMap.get("albumName");

				musicContainer.setMusicName(musicName);
				musicContainer.setMusicLength(musicLength);
				musicContainer.setMusicianName(musicianName);
				musicContainer.setAlbumName(albumName);

			} catch (Exception e) {
				throw new RuntimeException(e);
			}
			musicContainerList.add(musicContainer);
		});

		for (int i = 0; i < musicContainerList.size(); i++) {
			musicContainerList.get(i).setMusicUrl(musicUrlList.get(i));
			musicContainerList.get(i).setCoverImage(coverImageList.get(i));
		}

		return musicContainerList;
	}

}
