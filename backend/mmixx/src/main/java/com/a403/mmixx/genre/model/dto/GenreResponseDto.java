package com.a403.mmixx.genre.model.dto;

import com.a403.mmixx.genre.model.entity.Genre;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GenreResponseDto {
    private Integer genreSeq; // 장르 일련번호
    private String genreName; // 장르명

    public GenreResponseDto(Genre entity){
        this.genreSeq = entity.getGenreSeq();
        this.genreName = entity.getGenreName();
    }
}//JenreResponseDto
