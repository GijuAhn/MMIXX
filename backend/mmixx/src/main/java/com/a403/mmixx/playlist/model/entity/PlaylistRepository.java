package com.a403.mmixx.playlist.model.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
    List<Playlist> findByIsPrivateFalse();
    List<PlaylistMusic> findByPlaylistSeq(int seq);
}
