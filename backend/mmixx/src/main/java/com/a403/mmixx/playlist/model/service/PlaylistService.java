package com.a403.mmixx.playlist.model.service;

import com.a403.mmixx.music.model.entity.MusicRepository;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicDto;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistService {
	private final PlaylistRepository playlistRepository;
	private final MusicRepository musicRepository;

	/* 전체 플레이리스트 조회 */
	@Transactional(readOnly = true)
	public List<Playlist> getAllPlaylist() {
		return playlistRepository.findAll();
	}

	public List<PlaylistMusicDto> getPlaylistMusic() {
		return null;
	}

	public String getPlaylistCover(Long seq) {
		Playlist playlist = playlistRepository.findById(seq).get();
		return "";
	}

	/* 플레이리스트 삭제 */
	public void deletePlaylist(Long playlistSeq) {
		Playlist playlist = playlistRepository.findById(playlistSeq).orElse(null);
		if(playlist != null) {
			playlistRepository.deleteById(playlistSeq);
		}
	}

}
