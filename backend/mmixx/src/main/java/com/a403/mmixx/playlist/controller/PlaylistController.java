package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.dto.PlaylistResponseDto;
import com.a403.mmixx.playlist.model.service.PlaylistService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api
@RestController
@RequestMapping("/playlist")
public class PlaylistController {

	@Autowired
	private PlaylistService playlistService;
	
	@ApiOperation(value = "전체 플레이리스트 조회")
	@GetMapping
	public ResponseEntity<List<PlaylistResponseDto>> getPlayList() {
		return ResponseEntity.ok(playlistService.getPlaylistList());
	}
}
