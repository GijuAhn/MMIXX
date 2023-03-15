package com.a403.mmixx.genre.controller;

import com.a403.mmixx.genre.model.service.JenreService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api(tags = {"장르", "api"})
@RestController
@RequestMapping("/jenre")
@RequiredArgsConstructor
public class JenreController {
    private final JenreService jenreService;

    @ApiOperation(value = "전체 장르 조회(대분류)", notes = "대분류 장르 리스트 가져오기 ex) pop")
    @GetMapping
    public ResponseEntity<?> getGenreList() {
        return null;
    }//getGenreList

}//JenreController
