package com.a403.mmixx.genre.model.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@DynamicInsert
@Table(name = "preset")
public class Preset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer presetSeq; // 프리셋 일련번호

    @Column(length = 100, nullable = false)
    private String musicName; // 음악이름

    @Column(length = 500, nullable = false)
    private String musicUrl; // 음악 경로

    @Column(length = 500, nullable = false)
    private String coverImage; // 음악 이미지 경로

    @Column(nullable = false)
    private Integer musicLength; // 음악 길이

    @Column(nullable = false)
    private Integer genreSeq; // 장르 일련번호
}//Preset
