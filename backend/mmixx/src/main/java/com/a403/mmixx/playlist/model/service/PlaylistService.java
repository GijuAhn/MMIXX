package com.a403.mmixx.playlist.model.service;

import com.a403.mmixx.playlist.model.dto.PlaylistResponseDto;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class PlaylistService {
	private final PlaylistRepository musicRepository;

	public List<PlaylistResponseDto> findAll() {
		return null;
	}
}
