package com.a403.mmixx.music.model.dto;

import com.a403.mmixx.music.model.entity.Music;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

@Getter
public class MusicListResponseDto {
	private Integer musicSeq;
	private String musicName;
	private String musicUrl;
	private String coverImage;
	private Integer musicLength;
	private String musicianName;
	private String albumName;
	private Integer genreSeq;
	private Integer mixed;
	private Integer edited;
	private Integer presetSeq;

	@QueryProjection
	public MusicListResponseDto(Music entity) {
		this.musicSeq = entity.getMusicSeq();
		this.musicName = entity.getMusicName();
		this.musicUrl = entity.getMusicUrl();
		this.coverImage = entity.getCoverImage();
		this.musicLength = entity.getMusicLength();
		this.musicianName = entity.getMusicianName();
		this.albumName = entity.getAlbumName();
		this.genreSeq = entity.getGenreSeq();
		this.mixed = entity.getMixed();
		this.edited = entity.getEdited();
		this.presetSeq = entity.getPresetSeq();
	}
}
