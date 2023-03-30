package com.a403.mmixx.playlist.model.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
	Favorite findByUserSeqAndPlaylistSeq(int user_seq, int playlist_seq);
	void deleteByUserSeqAndPlaylistSeq(int user_seq, int playlist_seq);
}
