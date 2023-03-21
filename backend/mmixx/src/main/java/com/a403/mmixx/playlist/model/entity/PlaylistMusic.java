package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.music.model.entity.Music;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "playlist_music")
public class PlaylistMusic {
    @Id
    @GeneratedValue()
    private Long playlistMusicSeq;
    @Column(nullable = false)
    private Long playlistSeq;
    @Column(nullable = false)
    private Long musicSeq;
    @Column(nullable = false)
    private Long sequence;
}
