package com.a403.mmixx.music.model.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.entity.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository musicRepository;

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

	public Music updateMusic(Integer seq, String musicName) {
		Music music = musicRepository.findById(seq).orElse(null);
		if (music != null) {
			if (musicName == null || musicName.length() == 0) { // TODO: 수정 필요
				System.out.println("...musicName = null...!!");
			} else {
				System.out.println("...musicName is not null... : " + musicName);
			}
			music.updateMusic(musicName);
		}
		return music;
	}

	public Music deleteMusic(Integer seq) {
		Music music = musicRepository.findById(seq).orElse(null);
		if (music != null) {
			musicRepository.deleteById(seq);
		}
		return music;
	}
}
