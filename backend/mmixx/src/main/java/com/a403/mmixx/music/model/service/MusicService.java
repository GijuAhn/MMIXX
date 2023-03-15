package com.a403.mmixx.music.model.service;

import org.springframework.stereotype.Service;

import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.entity.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository musicRepository;

	public MusicDetailResponseDto getMusic(Long seq) {
		Music music = musicRepository.findById(seq)
			.orElseThrow(() -> new IllegalArgumentException("해당 음악은 없습니다. 방 ID: " + seq)); // error code: 500
		return new MusicDetailResponseDto(music);
	}
}
