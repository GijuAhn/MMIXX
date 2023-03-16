package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.playlist.model.entity.Playlist;
import lombok.Getter;

@Getter
public class PlaylistResponseDto {
	private Long playlistSeq;
	private Long userSeq;
	private String playlistName;
	private Boolean isPrivate;

	public PlaylistResponseDto(Playlist entity) {
		this.playlistSeq = entity.getPlaylistSeq();
		this.userSeq = entity.getUserSeq();
		this.playlistName = entity.getPlaylistName();
		this.isPrivate = entity.getIsPrivate();
	}
}
