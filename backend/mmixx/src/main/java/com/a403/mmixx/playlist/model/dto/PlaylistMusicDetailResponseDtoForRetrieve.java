package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.playlist.model.entity.Playlist;
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
    private List<MusicListResponseDto> musicList;

    public void setPlaylist(Playlist playlist) {
        this.playlistSeq = playlist.getPlaylistSeq();
    }
}
