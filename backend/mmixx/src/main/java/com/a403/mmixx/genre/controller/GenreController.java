package com.a403.mmixx.genre.controller;

import com.a403.mmixx.genre.model.service.GenreService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api(tags = {"장르", "api"})
@RestController
@RequestMapping("/genre")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @ApiOperation(value = "전체 장르 조회(대분류)", notes = "대분류 장르 리스트 가져오기 ex) pop")
    @GetMapping
    public ResponseEntity<?> getGenreList() {
        return ResponseEntity.ok(genreService.getJenreList());
    }//getGenreList

    @ApiOperation(value = "세부 장르 조회", notes = "장르의 세부 장르 리스트 가져오기 (가져올 장르 genreSeq)")
    @GetMapping("/{genreCategory}")
    public ResponseEntity<?> getGenreDetailList(@PathVariable("genreCategory") Integer seq) {
        return ResponseEntity.ok(genreService.getJenreDetailList(seq));
    }//getGenreList

    @ApiOperation(value = "장르 프리셋 조회", notes = "세부 장르에 해당하는 프리셋 가져오기")
    @GetMapping("/preset/{genreSeq}")
    public ResponseEntity<?> getPreset(@PathVariable("genreSeq") Integer seq) {
        return ResponseEntity.ok(genreService.getPreset(seq));
    }//getGenreList

}//JenreController
