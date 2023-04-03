

package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.dto.FavoriteRequestDto;
import com.a403.mmixx.playlist.model.dto.PlaylistDto;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicDetailResponseDtoForRetrieve;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicRequestDtoForAddMusic;
import com.a403.mmixx.playlist.model.dto.PlaylistSimpleDto;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.service.PlaylistService;
import com.amazonaws.Response;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Api(tags = {"플레이리스트", "api", "Playlist"})

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    // 빈 플레이리스트 생성 + 생성된 플레이리스트에 곡 리스트 추가한 후 DB 저장까지
    @PostMapping("/{userSeq}")
    public ResponseEntity<?> createPlaylist(@RequestBody PlaylistDto requestDto, @PathVariable int userSeq) {
        Integer playlistSeq = playlistService.createPlaylist(requestDto, userSeq);
        return ResponseEntity.ok().body(playlistSeq);
    }

    // 플레이리스트에 곡 추가
    @PostMapping("/{userSeq}/{playlistSeq}")
    public void addMusicToPlaylist(@RequestBody PlaylistMusicRequestDtoForAddMusic requestDto, @PathVariable String playlistSeq, @PathVariable String userSeq) {
        playlistService.addMusicToPlaylist(requestDto, playlistSeq, userSeq);
    }

    //  (관리자용) private 여부 상관없이 모든 유저의 모든 플레이리스트를 조회
    @GetMapping("/all/{userSeq}")
    public List<PlaylistSimpleDto> getAllPlaylist(@PathVariable int userSeq) {
        return playlistService.getAllPlaylist(userSeq);
    }

    //  전체 플레이리스트 목록을 조회 - public playlist
    @GetMapping("/global")
    public List<PlaylistSimpleDto> getGlobalPlaylist() {
        return playlistService.getGlobalPlaylist();
    }

    //  개인 플레이리스트 목록을 조회 - private playlist
    @GetMapping("/user/{userSeq}")
    public List<PlaylistSimpleDto> getPrivatePlaylist(@PathVariable int userSeq) {
        return playlistService.getPrivatePlaylist(userSeq);
    }


    // 해당(playlistSeq) 플레이리스트에 속한 노래 목록 조회
//    @GetMapping("/{playlistSeq}")
//    public List<PlaylistMusicDetailResponseDtoForRetrieve> getMusicListInPlaylist(@PathVariable("playlistSeq") int playlistSeq) {
//        return playlistService.getMusicListInPlaylist(playlistSeq);
//    }

    @ApiOperation(value = "플레이리스트 전체 삭제")
    @DeleteMapping("/{playlistSeq}")
    public void deletePlaylist(@PathVariable int playlistSeq) {
        playlistService.deletePlaylist(playlistSeq);
    }
    
    //  플레이리스트 삭제
    @ApiOperation(value = "플레이리스트 내의 개별 음악 삭제")
    @DeleteMapping("/detail/{playlistSeq}")
    public void deletePlaylistMusic(@PathVariable int playlistSeq) {
        playlistService.deletePlaylist(playlistSeq);
    }
    
    @ApiOperation(value = "즐겨찾기한 플레이리스트 목록 조회")
    @GetMapping("/favorite/{user_seq}")
    public ResponseEntity<?> findFavorite(@PathVariable int user_seq) {
    	return ResponseEntity.ok(playlistService.FindFavorite(user_seq));
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
