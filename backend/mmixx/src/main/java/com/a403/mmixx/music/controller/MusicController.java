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
import com.a403.mmixx.music.model.dto.MusicMixRequestDto;
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
    @PostMapping("/mix")
    public String mixMusic(@RequestBody MusicMixRequestDto requestDto) throws Exception {
        System.out.println("Music Mix Start");
        return musicService.mixMusic(requestDto);
    }

//    @PostMapping("/split")
//    public String splitMusic(@RequestBody Integer seq) throws Exception {
//        System.out.println("Music Split Start");
//        return musicService.splitMusic(seq);
//    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<byte[]> downloadMusic(@PathVariable String fileName) throws IOException {
        return awsS3Service.downloadMusic(fileName);
    }

    @GetMapping
    public ResponseEntity<Page<MusicListResponseDto>> getMusicList(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(musicService.getMusicList(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<MusicListResponseDto>> getMusicListByCondition(@PageableDefault(size = 10) Pageable pageable, MusicCondition condition) {
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
