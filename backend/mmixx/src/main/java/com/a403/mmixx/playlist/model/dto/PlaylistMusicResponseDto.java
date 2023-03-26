package com.a403.mmixx.playlist.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PlaylistMusicResponseDto {
    private int playlistSeq;
    private List<PlaylistMusicDto> playlistMusics;

    @Builder
    public PlaylistMusicResponseDto(int playlistSeq, List<PlaylistMusicDto> playlistMusic) {
        this.playlistSeq = playlistSeq;
        this.playlistMusics = playlistMusic;
    }
}
