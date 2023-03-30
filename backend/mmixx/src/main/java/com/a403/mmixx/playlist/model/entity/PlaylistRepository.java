package com.a403.mmixx.playlist.model.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
    List<Playlist> findByIsPrivateFalse();
    List<PlaylistMusic> findByPlaylistSeq(int seq);
}
