package com.a403.mmixx.music.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.dto.MusicMixRequestDto;
import com.a403.mmixx.music.model.dto.MusicRegistRequestDto;
import com.a403.mmixx.music.model.dto.MusicUpdateRequestDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.service.AwsS3Service;
import com.a403.mmixx.music.model.service.MusicService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"음악", "api"})
@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {
	private final MusicService musicService;
	private final AwsS3Service awsS3Service;


	//	Send REST API request to Django python server for AI processing
	@ApiOperation(value = "음악 스타일 변환", notes = "")
	@PostMapping("/mix")
	public String mixMusic(@RequestBody MusicMixRequestDto requestDto) throws Exception {
		System.out.println("Music Mix Start");
		return musicService.mixMusic(requestDto);
	}
	
	@ApiOperation(value = "음악 다운로드", notes = "")
	@GetMapping("/download/{music_seq}")
	public ResponseEntity<byte[]> downloadMusic(@PathVariable Integer music_seq) throws IOException {
		return awsS3Service.downloadMusic(music_seq);
	}

	@ApiOperation(value = "음악 리스트 조회", notes = "")
	@GetMapping
	public ResponseEntity<Page<MusicListResponseDto>> getMusicList(@PageableDefault(size=10) Pageable pageable) {
		return ResponseEntity.ok(musicService.getMusicList(pageable));
	}

	@ApiOperation(value = "음악 검색", notes = "")
	@GetMapping("/search")
	public ResponseEntity<Page<MusicListResponseDto>> getMusicListByCondition(@PageableDefault(size=10) Pageable pageable, MusicCondition condition) {
		return ResponseEntity.ok(musicService.getMusicListByCondition(condition, pageable));
	}

	@ApiOperation(value = "음악 상세 내용 조회", notes = "")
	@GetMapping("/{seq}")
	public ResponseEntity<MusicDetailResponseDto> getMusic(@PathVariable Integer seq) {
		return ResponseEntity.ok(musicService.getMusic(seq));
	}

	@ApiOperation(value = "음악 업로드", notes = "")
	@PostMapping
	public ResponseEntity<?> registMusic(@RequestPart("user") MusicRegistRequestDto user, @RequestPart("files") List<MultipartFile> multipartFiles) throws Exception {
		// 200 : 업로드 성공
		// 401 : (권한 없음)
		// 413 : 파일 용량 초과
		// 415 : 지원하지 않는 확장자
		// 500 : 업로드 실패
		return ResponseEntity.ok(musicService.registMusic(user, multipartFiles));
	}

	@ApiOperation(value = "음악 제목 수정", notes = "")
	@PutMapping("/{seq}")
	public ResponseEntity<?> updateMusic(@PathVariable Integer seq, @RequestBody MusicUpdateRequestDto reqeustDto) {
		Music music = musicService.updateMusic(seq, reqeustDto);
		if (music != null) {
			return ResponseEntity.ok(seq);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@ApiOperation(value = "음악 삭제", notes = "")
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
