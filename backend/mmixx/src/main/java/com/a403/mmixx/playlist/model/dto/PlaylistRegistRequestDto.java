package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class PlaylistRegistRequestDto {
    private String playlistName;
    private Boolean isPrivate;
    private Long userSeq;
    private List<PlaylistMusicDto> playlistMusic;

}
