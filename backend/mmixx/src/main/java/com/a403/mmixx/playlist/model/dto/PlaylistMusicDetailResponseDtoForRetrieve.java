package com.a403.mmixx.playlist.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//  플레이리스트 내 음악 상세조회시 사용되는 DTO
@Getter
@Setter
@NoArgsConstructor
public class PlaylistMusicDetailResponseDtoForRetrieve {
    private int playlistSeq;
    private List<PlaylistMusicDto> playlistMusics;

    @Builder
    public PlaylistMusicDetailResponseDtoForRetrieve(int playlistSeq, List<PlaylistMusicDto> playlistMusics) {
        this.playlistSeq = playlistSeq;
        this.playlistMusics = playlistMusics;
    }
}
