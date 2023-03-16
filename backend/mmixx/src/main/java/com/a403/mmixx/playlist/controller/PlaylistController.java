package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.dto.PlaylistMusicDto;
import com.a403.mmixx.playlist.model.dto.PlaylistRequestDto;
import com.a403.mmixx.playlist.model.dto.PlaylistResponseDto;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.service.PlaylistService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "플레이리스트")
@RestController
@RequestMapping("/playlist")
public class PlaylistController {

	@Autowired
	private PlaylistService playlistService;
	
	@ApiOperation(value = "전체 플레이리스트 조회")
	@GetMapping
	public ResponseEntity<?> getAllPlaylist() {
		return ResponseEntity.ok(playlistService.getAllPlaylist());
	}

	@ApiOperation(value = "새로운 플레이리스트 생성")
	@PostMapping
	public ResponseEntity<?> registPlaylist(@RequestBody PlaylistRequestDto requestDto) {
		return null;
	}
	
	@ApiOperation(value = "플레이리스트 삭제")
	@DeleteMapping("/{playlistSeq}")
	public void deletePlaylist(@PathVariable("playlistSeq") Long playlistSeq) {
		playlistService.deletePlaylist(playlistSeq);
	}

	@ApiOperation(value = "플레이리스트에 포함된 음악 목록 조회", notes = "해당 플레이리스트에 포함된 곡의 목록을 조회한다")
	@GetMapping("/{playlistSeq}")
	public ResponseEntity<List<PlaylistMusicDto>> getPlaylistMusic() {
		return null;
	}

	@ApiOperation(value = "플레이리스트 앨범커버")
	@GetMapping("/{playlistSeq}/1")
	public String getPlaylistCover() {
		return "플레이리스트 커버 조회";
	}

	@ApiOperation(value = "플레이리스트에 음악 추가")
	@PostMapping("/{playlistSeq}")
	public ResponseEntity<?> insertPlaylistMusic(@RequestBody PlaylistMusicDto musicDto) {
		return null;
	}

	@ApiOperation(value = "플레이리스트 상세편집 (수정)")
	@PutMapping("/detail/{playlistSeq}")
	public ResponseEntity<?> updatePlaylist() {
		return null;
	}

	@ApiOperation(value = "플레이리스트 상세편집 (삭졔)")
	@DeleteMapping("/detail/{playlistSeq}")
	public ResponseEntity<?> deletePlaylist() {
		return null;
	}

}
