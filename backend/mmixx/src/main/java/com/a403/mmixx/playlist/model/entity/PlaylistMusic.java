package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.music.model.entity.Music;
import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedList;

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

    @ManyToOne(targetEntity = Music.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "music_seq")
    private Integer musicSeq;

    @NotNull
    @Column(name = "sequence")
    private Integer sequence;
}
