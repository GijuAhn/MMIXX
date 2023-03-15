package com.a403.mmixx.genre.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Jenre {

    private int seq;
    private int categorySeq;
    private String name;
    private String summary;
    private String info;

}//Jenre
