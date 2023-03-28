package com.a403.mmixx.music.controller;

import java.io.IOException;
import java.util.List;

import com.amazonaws.http.apache.request.impl.HttpGetWithBody;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.dto.MusicRegistRequestDto;
import com.a403.mmixx.music.model.dto.MusicUpdateRequestDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.service.AwsS3Service;
import com.a403.mmixx.music.model.service.MusicService;

import lombok.RequiredArgsConstructor;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {
	private final MusicService musicService;
	private final AwsS3Service awsS3Service;

	//	Send REST API request to Django python server for AI processing
	@RequestMapping(value = "/mix/{seq}", method = RequestMethod.POST)
	public ResponseEntity<String> mixMusic(@PathVariable Integer seq) throws Exception {
		String jsonS3Address = musicService.mixMusic(seq);
//		TODO: JSON Address를 Request Body 에 담아서 아래 mixingMusicUrl 로 보낸다.

		String mixingMusicUrl = "https://j8a403.p.ssafy.io/django/api/mix";

		return ResponseEntity.status(200).body(jsonS3Address);
	}

	@PostMapping("/split/{seq}")
	public ResponseEntity<?> splitMusic(@PathVariable Integer seq) throws Exception {
		RestTemplate restTemplate = new RestTemplate();

		//	Set the headers for the HTTP request
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		//	Set the request body with the JSON object
		String jsonS3Address = musicService.mixMusic(seq);
		HttpEntity<String> entity = new HttpEntity<String>(jsonS3Address, headers);
		//	TODO: Request BOdy 에 넣어야 함.

		//	Send the HTTP request to the python django server
		String mixingMusicUrl = "https://j8a403.p.ssafy.io/django/api/split";
		String response = restTemplate.postForObject(mixingMusicUrl, entity, String.class);

		return ResponseEntity.ok(response);
	}


	@GetMapping("/download/{fileName}")
	public ResponseEntity<byte[]> downloadMusic(@PathVariable String fileName) throws IOException {
		return awsS3Service.downloadMusic(fileName);
	}

	@GetMapping
	public ResponseEntity<Page<MusicListResponseDto>> getMusicList(@PageableDefault(size=10) Pageable pageable) {
		return ResponseEntity.ok(musicService.getMusicList(pageable));
	}

	@GetMapping("/search")
	public ResponseEntity<Page<MusicListResponseDto>> getMusicListByCondition(@PageableDefault(size=10) Pageable pageable, MusicCondition condition) {
		return ResponseEntity.ok(musicService.getMusicListByCondition(condition, pageable));
	}

	@GetMapping("/{seq}")
	public ResponseEntity<MusicDetailResponseDto> getMusic(@PathVariable Integer seq) {
		return ResponseEntity.ok(musicService.getMusic(seq));
	}

	@PostMapping
	public ResponseEntity<?> registMusic(@RequestPart("user") MusicRegistRequestDto user, @RequestPart("files") List<MultipartFile> multipartFiles) throws Exception {
		// 200 : 업로드 성공
		// 401 : (권한 없음)
		// 413 : 파일 용량 초과
		// 415 : 지원하지 않는 확장자
		// 500 : 업로드 실패
		return ResponseEntity.ok(musicService.registMusic(user, multipartFiles));
	}

	@PutMapping("/{seq}")
	public ResponseEntity<?> updateMusic(@PathVariable Integer seq, @RequestBody MusicUpdateRequestDto reqeustDto) {
		Music music = musicService.updateMusic(seq, reqeustDto);
		if (music != null) {
			return ResponseEntity.ok(seq);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{seq}")
	public ResponseEntity<?> deleteMusic(@PathVariable Integer seq) {
		Music music = musicService.deleteMusic(seq);
		if (music != null) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
