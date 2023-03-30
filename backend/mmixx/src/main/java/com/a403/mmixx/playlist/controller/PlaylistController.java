

package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.dto.FavoriteRequestDto;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicRequestDto;
import com.a403.mmixx.playlist.model.service.PlaylistService;
import com.amazonaws.Response;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

@Api(tags = {"플레이리스트", "api", "Playlist"})
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

    @PostMapping
    public void save(@RequestBody PlaylistMusicRequestDto requestDto) {
        playlistService.save(requestDto);
    }
    @DeleteMapping("/{playlistSeq}")
    public void deletePlaylist(@PathVariable("playlistSeq") int seq) {
        playlistService.deletePlaylist(seq);
    }
    
    @ApiOperation(value = "즐겨찾기 등록")
    @PostMapping("/favorite")
    public ResponseEntity<?> insertFavorite(@RequestBody FavoriteRequestDto favoriteRequestDto) {
    	return ResponseEntity.ok(playlistService.insertFavorite(favoriteRequestDto));
    }
    
    @ApiOperation(value = "즐겨찾기 삭제")
    @DeleteMapping("/favorite/{user_seq}/{playlist_seq}")
    public ResponseEntity<?> deleteFavorite(@PathVariable int user_seq, @PathVariable int playlist_seq) {
    	System.out.println("user_seq : " + user_seq + " playlist_seq : " + playlist_seq);
    	String response = playlistService.deleteFavorite(user_seq, playlist_seq);
    	return ResponseEntity.ok(response);
    }
//    @ApiOperation(value = "플레이리스트 커버 이미지")
//    @GetMapping("/{playlistSeq}/1")
//    public String getCoverImage(@PathVariable("playlistSeq") int seq){
//        return playlistService.getCoverImage(seq);
//    }
}
