package com.a403.mmixx.playlist.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

//  플레이리스트 생성 및 수정시 사용되는 DTO
@Getter
@Setter
public class PlaylistMusicRequestDtoForCreateAndModify {
    private String playlistName;
    private boolean isPrivate;
    private int userSeq;
    private List<PlaylistMusicDto> playlistMusicDtoList;
}
