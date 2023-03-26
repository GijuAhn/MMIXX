package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.user.model.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "playlist")
public class Playlist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "playlist_seq")
	private int playlistSeq;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_seq")
	private User user;

	@NotNull
	@Column(name = "playlist_name")
	private String playlistName;

	@NotNull
	@Column(name = "is_private")
	private Boolean isPrivate;

	@OneToMany(mappedBy = "playlist")
	private List<PlaylistMusic> playlistMusics;
}
