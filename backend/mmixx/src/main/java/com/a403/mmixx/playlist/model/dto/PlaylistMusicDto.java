package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.service.MusicService;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaylistMusicDto {
    private int musicSeq;
    private int sequence;

    @Builder
    public PlaylistMusicDto(PlaylistMusic entity){
        this.musicSeq = entity.getMusicSeq();
        this.sequence = entity.getSequence();
    }

    public PlaylistMusicDto(Integer musicSeq, Integer sequence) {
        this.musicSeq = musicSeq;
        this.sequence = sequence;
    }
}
