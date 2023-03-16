package com.a403.mmixx.playlist.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@DynamicInsert
public class Playlist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long playlistSeq;
	@Column(nullable = false)
	private Long userSeq;
	@Column(length = 100, nullable = false)
	private String playlistName;
	@Column(nullable = false)
	private Boolean isPrivate;

}
