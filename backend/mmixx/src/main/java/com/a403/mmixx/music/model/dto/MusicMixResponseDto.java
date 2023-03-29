package com.a403.mmixx.music.model.dto;

import lombok.Getter;

@Getter
public class MusicMixResponseDto {
	private String music_url;
	private String mixed_music_url;
	
	public MusicMixResponseDto(String music_url, String mixed_music_url) {
		this.music_url = music_url;
		this.mixed_music_url = mixed_music_url;
	}
}
