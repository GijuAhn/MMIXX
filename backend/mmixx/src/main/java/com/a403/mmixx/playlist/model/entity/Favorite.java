package com.a403.mmixx.playlist.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "favorite")
public class Favorite {
    @Id
    @GeneratedValue
    private Long favoriteSeq;
    private Long userSeq;
    private Long playlistSeq;
}
