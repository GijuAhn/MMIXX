package com.a403.mmixx.music.model.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.*;

import javax.transaction.Transactional;

import com.a403.mmixx.music.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.entity.MusicRepository;
import com.a403.mmixx.music.model.entity.Preset;
import com.a403.mmixx.music.model.entity.PresetRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository musicRepository;
	private final PresetRepository presetRepository;
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

	public List<Music> registMusic(MusicRegistRequestDto user, List<MultipartFile> multipartFiles) throws Exception {
		List<Music> musicContainerList = uploadMusicAndArtworkWithMetadata(multipartFiles);

		//	set userSeq into musicContainerList
		for (Music music : musicContainerList) {
			music.setUserSeq(user.getUserSeq());
		}

		log.info("musicContainerList: " + musicContainerList);
		musicRepository.saveAll(musicContainerList);

		//	print musicContainerList's data, cascade
		for (Music music : musicContainerList) {
			log.info("musicName: " + music.getMusicName());
			log.info("musicUrl: " + music.getMusicUrl());
			log.info("coverImage: " + music.getCoverImage());
			log.info("length: " + music.getMusicLength());
			log.info("artist: " + music.getMusicianName());
			log.info("album: " + music.getAlbumName());
		}

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
//		C:\Users\SSAFY\AppData\Local\Temp\tomcat.5555.6401783967014632574\work\Tomcat\localhost\api\ upload_c84fc623_5e93_45cd_b1b0_ae7e377fa2d4_00000000.tmp
		musicContainerList = MP3MetadataService.extractMetadataFromMultipartFileList(multipartFiles);


		for (int i = 0; i < musicContainerList.size(); i++) {
			musicContainerList.get(i).setMusicUrl(musicUrlList.get(i));
			musicContainerList.get(i).setCoverImage(coverImageList.get(i));
			musicContainerList.get(i).setGenreSeq(0);
		}

		return musicContainerList;
	}

	public MusicMixResponseDto mixMusic(MusicMixRequestDto requestDto) {
		System.out.println("*** Start ***");
		//	return music_url stored in MySQL DB
		int music_seq = requestDto.getMusic_seq();
		int preset_seq = requestDto.getPreset_seq();
		System.out.println("music_seq : " + music_seq);
		System.out.println("preset_seq : " + preset_seq);

		System.out.println("*** 1 ***");
		Music music = musicRepository.findById(music_seq).orElse(null);
		Preset preset = presetRepository.findById(preset_seq).orElse(null);

		System.out.println("*** 2 ***");
		String music_path = music.getMusicUrl().replace("https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/", "");
		String preset_path = preset.getPresetUrl().replace("https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/", "");
		System.out.println("music_path : " + music_path);
		System.out.println("preset_path : " + preset_path);

		System.out.println("*** 3 ***");
		RestTemplate restTemplate = new RestTemplate();
		String response = "";

		System.out.println("*** 4 ***");
		String url = "https://j8a403.p.ssafy.io/django/api/mix";
		//		String url = "http://127.0.0.1:8000/api/mix";
		String data = "{ \"music_path\" : \"" + music_path + "\", \"preset_path\" : \"" + preset_path + "\"}";

		try {
			System.out.println("*** 5 ***");
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

//			MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//			body.add("music_path", musicUrl);

			HttpEntity<?> requestMessage = new HttpEntity<>(data, headers);
//			HttpEntity<String> response = restTemplate.postForEntity(url, requestMessage, String.class);
//			System.out.println(response);
			HttpMethod method = HttpMethod.POST;
//			response = restTemplate.getForObject(url, String.class, data);
			System.out.println("*** 6 ***");
			response = restTemplate.postForEntity(url, requestMessage, String.class).getBody();

			System.out.println("Success Music Mix");
			System.out.println("response : " + response);
			response = response.replace("{\"music\":\"", "");
			response = response.replace("\"}", "");
			System.out.println("response : " + response);
			System.out.println("response.toString() : " + response.toString());
//			response = restTemplate.exchange(url, method, requestMessage, String.class).getBody();
		} catch (HttpStatusCodeException e) {
			if(e.getStatusCode() == HttpStatus.NOT_FOUND) {
				System.out.println("not found");
			} else {
				response = "API Fail";
			}
		}
		System.out.println("*** 7 ***"); // DB 저장
		
		String new_music_path = "https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/" + response;
//		String new_music_name = response.replace("music/", "");
		String new_music_name = music.getMusicName().replace(".mp3", "_mix.mp3");
		System.out.println("new_music_path : " + new_music_path);
		System.out.println("new_music_name : " + new_music_name);
		
		Music new_music = new Music();
		
		new_music.setAlbumName(music.getAlbumName());
		new_music.setCoverImage(music.getCoverImage());
		new_music.setEdited(music.getEdited());
		new_music.setMixed(music.getMusicSeq());
		new_music.setGenreSeq(music.getGenreSeq());
		new_music.setMusicLength(music.getMusicLength());
		new_music.setMusicName(new_music_name);
		new_music.setMusicUrl(new_music_path);
		new_music.setMusicianName(music.getMusicianName());
		new_music.setUserSeq(music.getUserSeq());
		new_music.setPresetSeq(music.getPresetSeq());
		
		musicRepository.save(new_music);
		
		String result = "{ \"music_url\" : \"" + music.getMusicUrl() + "\", \"mixed_music_url\" : \"" + new_music.getMusicUrl() + "\"}";
		MusicMixResponseDto responseDto = new MusicMixResponseDto(music.getMusicUrl(), new_music.getMusicUrl());
//		String test = "hello";
		return responseDto;
//		return test;


//		return musicUrl;
	}
}
