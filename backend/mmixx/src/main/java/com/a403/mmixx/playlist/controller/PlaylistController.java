

package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.service.PlaylistService;
import com.amazonaws.Response;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @GetMapping
    public ResponseEntity<?> getPlaylist() {
        return ResponseEntity.ok(playlistService.getPlaylist());
    }

    @GetMapping("/{playlistSeq}")
    public ResponseEntity<?> getPlaylistMusic(@PathVariable("playlistSeq") int seq) {
        return ResponseEntity.ok(playlistService.getPlaylistMusic(seq));
    }
//
//    @ApiOperation(value = "플레이리스트 삭제")
//    @DeleteMapping("/{playlistSeq}")
//    public void deletePlaylist(@PathVariable("playlistSeq") int seq) {
//        playlistService.deletePlaylist(seq);
//    }
//
//    @ApiOperation(value = "플레이리스트 커버 이미지")
//    @GetMapping("/{playlistSeq}/1")
//    public String getCoverImage(@PathVariable("playlistSeq") int seq){
//        return playlistService.getCoverImage(seq);
//    }
}
