package com.a403.mmixx.playlist.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;

//  플레이리스트에 음악 추가시 사용되는 DTO
@Getter
@Setter
public class PlaylistMusicRequestDtoForAddMusic {

    private int playlistSeq;

    //  기존 플레이리스트에 있던 곡들의 리스트
    private LinkedList<PlaylistMusicDto> oriPlaylistMusicDtoList;

    //  추가할 곡의 리스트
    private LinkedList<PlaylistMusicDto> addPlaylistMusicDtoList;

}
