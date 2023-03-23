package com.a403.mmixx.music.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
//		TODO: DB에 저장하는 로직 추가
		return getID3v2MetadataTest(multipartFiles);
//		return getID3v2Metadata(multipartFiles);
	}


	//	Extract Metadata from ID3v2 format and music + cover image upload to S3
	public List<Music> getID3v2Metadata(List<MultipartFile> multipartFiles) {

		List<String> musicUrlList;
		List<String> coverImageList;
		List<Music> musicContainerList = new ArrayList<>();

		musicUrlList = awsS3Service.uploadMusicToS3(multipartFiles);
		coverImageList = awsS3Service.uploadCoverImageToS3(multipartFiles);

		multipartFiles.forEach(file -> {
			Music musicContainer = null;
			try {
				musicContainer = new Music();

				String musicName = "";
				String musicUrl = "";
				String coverImage = "";
				int musicLength = 0;
				String musicianName = "";
				String albumName = "";

				Mp3File mp3file = new Mp3File(file.getOriginalFilename());
				if (mp3file.hasId3v2Tag()) {
					ID3v2 id3v2Tag = mp3file.getId3v2Tag();
					musicName = id3v2Tag.getTitle();
					musicianName = id3v2Tag.getArtist();
					albumName = id3v2Tag.getAlbum();
					musicLength = Math.toIntExact(mp3file.getLengthInSeconds());
					byte[] coverImageData = id3v2Tag.getAlbumImage();

					if (coverImageData != null) {
						System.out.println("Have album image data, length: " + coverImageData.length + " bytes");
						System.out.println("Album image mime type: " + id3v2Tag.getAlbumImageMimeType());
					}
				}

				musicContainer.setMusicName(musicName);
				musicContainer.setMusicUrl(musicUrl);
				musicContainer.setCoverImage(coverImage);
				musicContainer.setMusicLength(musicLength);
				musicContainer.setMusicianName(musicianName);
				musicContainer.setAlbumName(albumName);

			} catch (InvalidDataException | UnsupportedTagException | IOException e) {
				e.printStackTrace();
			}
			musicContainerList.add(musicContainer);
		});

		for (int i = 0; i < musicContainerList.size(); i++) {
			musicContainerList.get(i).setMusicUrl(musicUrlList.get(i));
			musicContainerList.get(i).setCoverImage(coverImageList.get(i));
		}

		return musicContainerList;
	}


	public List<Music> getID3v2MetadataTest(List<MultipartFile> multipartFiles) {

		List<String> testFileList = new ArrayList<>();
		List<Music> musicContainerList = new ArrayList<>();

		testFileList = awsS3Service.uploadFullAudioFileToS3(multipartFiles);
		System.out.println("testFileList: " + testFileList);

		multipartFiles.forEach(file -> {
			Music musicContainer = null;
			try {
				musicContainer = new Music();

				String musicName = "";
				String musicUrl = "";
				String coverImage = "";
				int musicLength = 0;
				String musicianName = "";
				String albumName = "";

				Mp3File mp3file = new Mp3File(file.getOriginalFilename());
				if (mp3file.hasId3v2Tag()) {
					ID3v2 id3v2Tag = mp3file.getId3v2Tag();
					musicName = id3v2Tag.getTitle();
					System.out.println("musicName: " + musicName);
					musicianName = id3v2Tag.getArtist();
					System.out.println("musicianName: " + musicianName);
					albumName = id3v2Tag.getAlbum();
					System.out.println("albumName: " + albumName);
					musicLength = Math.toIntExact(mp3file.getLengthInSeconds());
					System.out.println("musicLength: " + musicLength);
					byte[] coverImageData = id3v2Tag.getAlbumImage();

					if (coverImageData != null) {
						System.out.println("Have album image data, length: " + coverImageData.length + " bytes");
						System.out.println("Album image mime type: " + id3v2Tag.getAlbumImageMimeType());
					}
				}

				musicContainer.setMusicName(musicName);
				musicContainer.setMusicUrl(musicUrl);
				musicContainer.setCoverImage(coverImage);
				musicContainer.setMusicLength(musicLength);
				musicContainer.setMusicianName(musicianName);
				musicContainer.setAlbumName(albumName);

			} catch (InvalidDataException | UnsupportedTagException | IOException e) {
				e.printStackTrace();
			}
			musicContainerList.add(musicContainer);
		});

		return musicContainerList;
	}


}
