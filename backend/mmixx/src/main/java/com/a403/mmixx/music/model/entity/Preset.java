package com.a403.mmixx.music.model.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@DynamicInsert
public class Preset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer presetSeq;
    @Column(length = 100, nullable = false)
    private String presetName;
    @Column(length = 500, nullable = false)
    private String presetUrl;
    @Column(length = 500, nullable = false)
    private String coverImage;
    @Column(nullable = false)
    private int musicLength;
}
