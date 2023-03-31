package com.a403.mmixx.genre.model.entity;

import com.a403.mmixx.genre.model.dto.GenreDetailResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

    /* 장르 조회 */
    List<Genre> findAllByGenreCategory(Integer genreCategory);

}//GenreRepository
