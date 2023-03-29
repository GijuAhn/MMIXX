package com.a403.mmixx.playlist.model.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaylistMusicRepository {

    void insertByPlaylistSeqAndMusicSeqAndSequence(int playlistSeq, int musicSeq, int sequence);

    void deleteByPlaylistSeq(Integer playlistSeq);
}