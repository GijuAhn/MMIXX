package com.a403.mmixx.music.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@DynamicInsert
public class Music {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer musicSeq;
	@Column(nullable = false)
	private Integer userSeq;
	@Column(length = 100, nullable = false)
	private String musicName;
	@Column(length = 500, nullable = false)
	private String musicUrl;
	@Column(length = 500)
	private String coverImage;
	@Column(nullable = false)
	private Integer musicLength;
	@Column(length = 100)
	private String musicianName;
	@Column(length = 100)
	private String albumName;
	@Column(nullable = false)
	private Integer genreSeq;
	private Integer mixed;
	private Integer edited;

	@Builder
	public Music(Integer userSeq, String musicName, String musicUrl, Integer musicLength, Integer genreSeq) { // TODO: update 안돼서 일단 이거 추가해봄.. 수정 필요
		this.userSeq = userSeq;
		this.musicName = musicName;
		this.musicUrl = musicUrl;
		this.musicLength = musicLength;
		this.genreSeq = genreSeq;
	}

	public void updateMusic(String musicName){
		this.musicName = musicName;
	}

}
