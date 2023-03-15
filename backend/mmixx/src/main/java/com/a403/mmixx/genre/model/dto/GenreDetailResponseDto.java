package com.a403.mmixx.genre.model.dto;

import com.a403.mmixx.genre.model.entity.Genre;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
public class GenreDetailResponseDto {
    private Integer genreSeq; // 장르 일련번호

    private Integer genreCategory; // 장르 대분류

    private String genreName; // 장르명

    private String genreSummary; // 장르 요약

    private String genreInfo; // 장르 설명

    @QueryProjection
    @Builder
    public GenreDetailResponseDto(Genre entity){
        this.genreSeq = entity.getGenreSeq();
        this.genreCategory = entity.getGenreCategory();
        this.genreName = entity.getGenreName();
        this.genreSummary = entity.getGenreSummary();
        this.genreInfo = entity.getGenreInfo();
    }
}//JenreDetailResponseDto
