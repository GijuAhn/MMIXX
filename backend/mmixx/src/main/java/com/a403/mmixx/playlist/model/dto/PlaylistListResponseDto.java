package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.playlist.model.entity.Playlist;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class PlaylistListResponseDto {
	private Long playlistSeq;
	private Long userSeq;
	private String playlistName;
	private Boolean isPrivate;

	@QueryProjection
	public PlaylistListResponseDto(Playlist entity) {
		this.playlistSeq = entity.getPlaylistSeq();
		this.userSeq = entity.getUserSeq();
		this.playlistName = entity.getPlaylistName();
		this.isPrivate = entity.getIsPrivate();
	}
}
