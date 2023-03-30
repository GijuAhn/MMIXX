package com.a403.mmixx.playlist.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "favorite")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_seq")
    private int favoriteSeq;
    @Column(nullable = false)
    private int userSeq;
    @Column(nullable = false)
    private int playlistSeq;
    
    public Favorite(int userSeq, int playlistSeq) {
    	this.userSeq = userSeq;
    	this.playlistSeq = playlistSeq;
    }
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_seq")
//    private User user;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "playlist_seq")
//    private Playlist playlist;
}
