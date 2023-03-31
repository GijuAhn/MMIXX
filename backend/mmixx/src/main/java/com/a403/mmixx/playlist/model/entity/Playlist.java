package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.user.model.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.ArrayExpression;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "playlist")
public class Playlist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "playlist_seq")
	private Integer playlistSeq;

	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "user_seq", referencedColumnName = "userSeq", nullable = false)
	@JsonIgnore
//	private Integer userSeq;
	private User user;

	@NotNull
	@Column(name = "playlist_name")
	private String playlistName;

	@NotNull
	@Column(name = "is_private")
	private Boolean isPrivate;

	public int getUserSeq() {
		return user.getUserSeq();
	}
}
