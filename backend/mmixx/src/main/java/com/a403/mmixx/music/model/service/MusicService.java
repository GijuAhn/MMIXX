package com.a403.mmixx.music.model.service;

import java.io.ByteArrayOutputStream;
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
import com.a403.mmixx.music.model.service.MP3MetadataService;
import com.a403.mmixx.music.model.service.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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

	public List<Music> registMusic(List<MultipartFile> multipartFiles) throws Exception {
		List<Music> musicContainerList = uploadMusicAndArtworkWithMetadata(multipartFiles);

//		log.info("musicContainerList: " + musicContainerList);
//		musicRepository.saveAll(musicContainerList);

		//	print musicContainerList's data, cascade
//		for (Music music : musicContainerList) {
//			log.info("musicName: " + music.getMusicName());
//			log.info("musicUrl: " + music.getMusicUrl());
//			log.info("coverImage: " + music.getCoverImage());
//			log.info("length: " + music.getMusicLength());
//			log.info("artist: " + music.getMusicianName());
//			log.info("album: " + music.getAlbumName());
//		}

		return musicContainerList;
	}


	//	Extract Metadata from ID3v2 format and music + cover image upload to S3
	public List<Music> uploadMusicAndArtworkWithMetadata(List<MultipartFile> multipartFiles) throws Exception {

		//	Deep copy for redundant use of stream
		List<InputStream> multipartFilesCopy1 = new ArrayList<>();

		for (MultipartFile multipartFile : multipartFiles) {
			//	save multipartFile(extend of InputStream) to ByteArrayOutputStream
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			InputStream is = multipartFile.getInputStream();
			is.transferTo(baos);
			InputStream multipartFileInputStreamClone1 = multipartFile.getInputStream();

			multipartFilesCopy1.add(multipartFileInputStreamClone1);
		}


		List<Music> musicContainerList;
		List<String> musicUrlList;
		List<String> coverImageList;


		musicUrlList = awsS3Service.uploadMusicToS3(multipartFiles);
		coverImageList = awsS3Service.uploadCoverImageToS3(multipartFiles);
//		WARN 14280 --- [nio-5555-exec-1] s.w.m.s.StandardServletMultipartResolver : Failed to perform cleanup of multipart items
		musicContainerList = MP3MetadataService.extractMetadataFromMultipartFileList(multipartFiles);


		for (int i = 0; i < musicContainerList.size(); i++) {
			musicContainerList.get(i).setMusicUrl(musicUrlList.get(i));
			musicContainerList.get(i).setCoverImage(coverImageList.get(i));
		}

		return musicContainerList;
	}

}
