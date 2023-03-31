package com.a403.mmixx.playlist.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

//  플레이리스트에 음악 추가시 사용되는 DTO
@Getter
@Setter
@NoArgsConstructor
public class PlaylistMusicRequestDtoForAddMusic {

    private int playlistSeq;

    //  기존 플레이리스트에 있던 곡들의 리스트
    private LinkedList<PlaylistMusicDto> oriPlaylistMusicDtoList;

    //  추가할 곡의 리스트
    private LinkedList<PlaylistMusicDto> addPlaylistMusicDtoList;

    public List<Integer> getMusicSeqList() {
        List<Integer> musicSeqList = new LinkedList<>();
        for (PlaylistMusicDto playlistMusicDto : addPlaylistMusicDtoList) {
            musicSeqList.add(playlistMusicDto.getMusicSeq());
        }
        return musicSeqList;
    }

}
