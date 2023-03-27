package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlaylistMusicDto {
    private int musicSeq;
    private int sequence;
    private Music music;

    @Builder
    public PlaylistMusicDto(PlaylistMusic entity){
        this.musicSeq = entity.getMusic().getMusicSeq();
        this.sequence = entity.getSequence();
        this.music = entity.getMusic();
    }
}
