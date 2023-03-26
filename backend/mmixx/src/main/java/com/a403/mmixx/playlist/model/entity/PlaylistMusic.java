package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.music.model.entity.Music;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@Table(name = "playlist_music")
public class PlaylistMusic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int playlistMusicSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_seq")
    private Playlist playlist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_seq")
    private Music music;

    @NotNull
    private Integer sequence;
}
