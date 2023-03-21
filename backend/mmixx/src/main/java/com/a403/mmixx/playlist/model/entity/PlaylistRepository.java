package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.playlist.model.dto.PlaylistListResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
//    List<Playlist> findAll();
}
