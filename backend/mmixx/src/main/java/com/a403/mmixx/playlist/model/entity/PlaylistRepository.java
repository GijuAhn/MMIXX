package com.a403.mmixx.playlist.model.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    /* 전체 플레이리스트 조회 */
    List<Playlist> findAll();
}
