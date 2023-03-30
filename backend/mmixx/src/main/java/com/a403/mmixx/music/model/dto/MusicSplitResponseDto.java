package com.a403.mmixx.music.model.dto;

import lombok.Getter;

@Getter
public class MusicSplitResponseDto {
	private String music_inst_url;
	
	public MusicSplitResponseDto(String music_inst_url) {
		this.music_inst_url = music_inst_url;
	}
}
