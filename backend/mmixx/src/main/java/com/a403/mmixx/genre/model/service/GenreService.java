package com.a403.mmixx.genre.model.service;

import com.a403.mmixx.genre.model.dto.GenreDetailResponseDto;
import com.a403.mmixx.genre.model.entity.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;

//    public List<GenreDetailResponseDto> getJenreDetailList(Integer genreCategory) {
//        return genreRepository.findAllByGenreCategory(genreCategory);
//    }

}//JenreService
