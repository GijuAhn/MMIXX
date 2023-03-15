package com.a403.mmixx.music.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;
import com.a403.mmixx.music.model.service.MusicService;

@RestController
@RequestMapping("/music")
public class MusicController {
	@Autowired
	private MusicService musicService;

	@GetMapping("/{seq}")
	public ResponseEntity<MusicDetailResponseDto> getMusic(@PathVariable Long seq) {
		return ResponseEntity.ok(musicService.getMusic(seq));
	}


}
