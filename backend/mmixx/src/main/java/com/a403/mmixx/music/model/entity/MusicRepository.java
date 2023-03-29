package com.a403.mmixx.music.model.entity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Integer>, MusicRepositoryCustom {
	 Page<Music> findByUserSeq(Integer user_seq, Pageable pageable);
}
