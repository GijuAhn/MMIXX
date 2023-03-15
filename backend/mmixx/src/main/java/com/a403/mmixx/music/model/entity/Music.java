package com.a403.mmixx.music.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

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
	private Long musicSeq;
	@Column(nullable = false)
	private Long userSeq;
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
	private Long genreSeq;
	private Long mixed;
	private Long edited;

}
