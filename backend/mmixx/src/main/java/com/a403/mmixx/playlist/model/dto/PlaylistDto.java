package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.playlist.model.entity.Playlist;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;

// 플레이리스트의 DTO
@Getter
@Setter
public class PlaylistDto {
    private int playlistSeq;
    private int userSeq;
    private String playlistName;
    private boolean isPrivate;

    public PlaylistDto(Playlist entity) {
        this.playlistSeq = entity.getPlaylistSeq();
        this.userSeq = entity.getUser().getUserSeq();
        this.playlistName = entity.getPlaylistName();
        this.isPrivate = entity.getIsPrivate();
    }
}
