

package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.dto.PlaylistDto;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicDetailResponseDtoForRetrieve;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicRequestDtoForAddMusic;
import com.a403.mmixx.playlist.model.dto.PlaylistSimpleDto;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    // 빈 플레이리스트 생성 + 생성된 플레이리스트에 곡 리스트 추가한 후 DB 저장까지
    @PostMapping("/{userSeq}")
    public ResponseEntity<?> createPlaylist(@RequestBody PlaylistDto requestDto, @PathVariable int userSeq) {
        playlistService.createPlaylist(requestDto, userSeq);
        return ResponseEntity.ok().build();
    }

    // 플레이리스트에 곡 추가
    @PostMapping("/{userSeq}/{playlistSeq}")
    public void addMusicToPlaylist(@RequestBody PlaylistMusicRequestDtoForAddMusic requestDto, @PathVariable String playlistSeq, @PathVariable String userSeq) {
        playlistService.addMusicToPlaylist(requestDto, playlistSeq, userSeq);
    }

    //  (관리자용) private 여부 상관없이 모든 유저의 모든 플레이리스트를 조회
    @GetMapping("/all/{userSeq}")
    public List<Playlist> getAllPlaylist(@PathVariable int userSeq) {
        return playlistService.getAllPlaylist(userSeq);
    }

    //  전체 플레이리스트 목록을 조회 - public playlist
    @GetMapping("/global")
    public List<Playlist> getGlobalPlaylist() {
        return playlistService.getGlobalPlaylist();
    }

    //  개인 플레이리스트 목록을 조회 - private playlist
    @GetMapping("/user/{userSeq}")
    public List<Playlist> getPrivatePlaylist(@PathVariable int userSeq) {
        return playlistService.getPrivatePlaylist(userSeq);
    }


    // 해당(playlistSeq) 플레이리스트에 속한 노래 목록 조회
    @GetMapping("/{playlistSeq}")
    public PlaylistMusicDetailResponseDtoForRetrieve getMusicListInPlaylist(@PathVariable("playlistSeq") int playlistSeq) {
        return playlistService.getMusicListInPlaylist(playlistSeq);
    }

    //  플레이리스트 삭제
    @DeleteMapping("/{playlistSeq}")
    public void deletePlaylist(@PathVariable int playlistSeq) {
        playlistService.deletePlaylist(playlistSeq);
    }

}
