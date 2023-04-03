package com.a403.mmixx.playlist.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FindFavoriteDto {
	private Integer favorite_seq;
	private Integer user_seq;
	private Integer playlist_seq;
	private String playlist_name;
	private Boolean is_private;
}
