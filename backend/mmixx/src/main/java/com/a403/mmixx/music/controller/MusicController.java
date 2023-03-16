package com.a403.mmixx.music.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.service.MusicService;

@RestController
@RequestMapping("/music")
public class MusicController {
	@Autowired
	private MusicService musicService;

	@GetMapping
	public ResponseEntity<Page<MusicListResponseDto>> getMusicList(@PageableDefault(size=10) Pageable pageable) {
		return ResponseEntity.ok(musicService.getMusicList(pageable));
	}

	@GetMapping("/search")
	public ResponseEntity<Page<MusicListResponseDto>> getMusicListByCondition(@PageableDefault(size=10) Pageable pageable, MusicCondition condition) {
		return ResponseEntity.ok(musicService.getMusicListByCondition(condition, pageable)); // TODO
	}

	@GetMapping("/{seq}")
	public ResponseEntity<MusicDetailResponseDto> getMusic(@PathVariable Integer seq) {
		return ResponseEntity.ok(musicService.getMusic(seq));
	}

	@PostMapping
	public ResponseEntity<?> registMusic() { // TODO
		return ResponseEntity.ok().build();
	}

	@PutMapping("/{seq}")
	public ResponseEntity<?> updateMusic(@PathVariable Integer seq, @RequestBody String musicName) { // TODO: 수정 필요. update 안됨.
		Music music = musicService.updateMusic(seq, musicName);
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
