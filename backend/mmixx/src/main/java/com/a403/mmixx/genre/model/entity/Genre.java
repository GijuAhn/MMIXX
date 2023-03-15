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
@Table(name = "genre")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer genreSeq; // 장르 일련번호

    private Integer genreCategory; // 장르 대분류

    @Column(length = 100, nullable = false)
    private String genreName; // 장르명

    @Column(length = 100)
    private String genreSummary; // 장르 요약

    @Column(length = 500)
    private String genreInfo; // 장르 설명

}//Jenre
