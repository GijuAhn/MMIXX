package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.playlist.model.dto.PlaylistRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}
