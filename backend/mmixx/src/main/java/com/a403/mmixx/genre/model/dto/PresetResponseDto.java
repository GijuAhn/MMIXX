package com.a403.mmixx.genre.model.dto;

import com.a403.mmixx.genre.model.entity.Preset;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PresetResponseDto {

    private Integer presetSeq; // 프리셋 일련번호
    private String musicName; // 음악 이름
    private String musicUrl; // 음악 경로
    private String coverImage; // 음악 이미지 경로
    private Integer musicLength; // 음악 길이
    private Integer genreSeq; // 장르 일련번호

    public PresetResponseDto(Preset entity){
        this.presetSeq = entity.getPresetSeq();
        this.musicName = entity.getMusicName();
        this.musicUrl = entity.getMusicUrl();
        this.coverImage = entity.getCoverImage();
        this.musicLength = entity.getMusicLength();
        this.genreSeq = entity.getGenreSeq();
    }

}//PresetResponseDto
