package com.a403.mmixx.genre.model.service;

import com.a403.mmixx.genre.model.dto.GenreDetailResponseDto;
import com.a403.mmixx.genre.model.dto.GenreResponseDto;
import com.a403.mmixx.genre.model.dto.PresetResponseDto;
import com.a403.mmixx.genre.model.entity.GenreRepository;
import com.a403.mmixx.genre.model.entity.Preset1;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;

    /* 장르 리스트 가져오기 */
    public List<GenreResponseDto> getGenreList() {

        return genreRepository.findAllByGenreCategory(null)
                .stream()
                .map(GenreResponseDto::new)
                .collect(Collectors.toList());

    }//getJenreList

    /* 세부 장르 리스트 가져오기 */
    public List<GenreDetailResponseDto> getGenreDetailList(Integer genreCategory) {

        return genreRepository.findAllByGenreCategory(genreCategory)
                .stream()
                .map(GenreDetailResponseDto::new)
                .collect(Collectors.toList());

    }//getJenreDetailList

    /* 프리셋 가져오기 */
    public PresetResponseDto getPreset(Integer seq) {
        Preset1 entity = genreRepository.findByGenreSeq(seq);
//                .orElseThrow();
        return new PresetResponseDto(entity);
    }

}//JenreService
