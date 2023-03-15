package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {
	@Autowired
	private PlaylistService playlistService;

}
