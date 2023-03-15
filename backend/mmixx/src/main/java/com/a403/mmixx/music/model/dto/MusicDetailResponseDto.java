package com.a403.mmixx.music.model.dto;

import com.a403.mmixx.music.model.entity.Music;

import lombok.Getter;

@Getter
public class MusicDetailResponseDto {
	private Long musicSeq;
	private Long userSeq;
	private String musicName;
	private String musicUrl; // TODO: 데이터타입 수정?
	private String coverImage; // TODO: 데이터타입 수정?
	private Integer musicLength;
	private String musicianName;
	private String albumName;
	private Long genreSeq;
	private Long mixed;
	private Long edited;


	public MusicDetailResponseDto(Music entity) {
		this.musicSeq = entity.getMusicSeq();
		this.userSeq = entity.getUserSeq();
		this.musicName = entity.getMusicName();
		this.musicUrl = entity.getMusicUrl();
		this.coverImage = entity.getCoverImage();
		this.musicLength = entity.getMusicLength();
		this.musicianName = entity.getMusicianName();
		this.albumName = entity.getAlbumName();
		this.genreSeq = entity.getGenreSeq();
		this.mixed = entity.getMixed();
		this.edited = entity.getEdited();
	}
}
