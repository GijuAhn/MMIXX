package com.a403.mmixx.playlist.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlaylistMusicRequestDto {
    private String playlistName;
    private boolean isPrivate;
    private int userSeq;
    private List<PlaylistMusicListDto> playlistMusicList;
}
