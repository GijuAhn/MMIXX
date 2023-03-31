package com.a403.mmixx.music.model.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Integer>, MusicRepositoryCustom {
	// Page<Music> findAll(Pageable pageable);

    Music findByMusicSeq(int seq);

}
