

package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.dto.PlaylistMusicRequestDtoForAddMusic;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicRequestDtoForCreateAndModify;
import com.a403.mmixx.playlist.model.service.PlaylistService;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    // 빈 플레이리스트 생성
    @PostMapping
    public void createEmptyPlaylist(@RequestBody JsonObject jsonObjectForCreatePlaylist) {
        playlistService.createEmptyPlaylistByJSON(jsonObjectForCreatePlaylist);
    }

    // 플레이리스트에 곡 추가 (Insert), 프론트로부터 JSON 객체를 받는다.
    @PostMapping("/{playlistSeq}")
    public void addMusicToPlaylist(@RequestBody JsonObject jsonObjectForAddMusic) {
        playlistService.addMusicToPlaylist(jsonObjectForAddMusic);
    }


    //  전체 플레이리스트 목록을 조회
    @GetMapping
    public ResponseEntity<?> getGlobalPlaylist() {
        return ResponseEntity.ok(playlistService.getGlobalPlaylist());
    }

    // 해당(playlistSeq) 플레이리스트에 속한 노래 목록 조회
    @GetMapping("/{playlistSeq}")
    public ResponseEntity<?> getMucisInPlaylist(@PathVariable("playlistSeq") int seq) {
        return ResponseEntity.ok(playlistService.getPlaylistMusic(seq));
    }


}
