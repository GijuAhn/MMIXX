package com.a403.mmixx.playlist.model.service;

import com.a403.mmixx.playlist.model.dto.PlaylistResponseDto;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaylistService {
	private final PlaylistRepository playlistRepository;

	/* 전체 플레이리스트 조회 */
	public List<PlaylistResponseDto> getAllPlaylist() {
		return null;
	}

	/* 플레이리스트 삭제 */
	public void deletePlaylist(Long playlistSeq) {
		var playlist = playlistRepository.findById(playlistSeq);
//		playlistRepository.delete(playlist);
	}

}
