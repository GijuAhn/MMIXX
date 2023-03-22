package com.a403.mmixx.playlist.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPlaylist is a Querydsl query type for Playlist
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlaylist extends EntityPathBase<Playlist> {

    private static final long serialVersionUID = -629894068L;

    public static final QPlaylist playlist = new QPlaylist("playlist");

    public final BooleanPath isPrivate = createBoolean("isPrivate");

    public final StringPath playlistName = createString("playlistName");

    public final NumberPath<Long> playlistSeq = createNumber("playlistSeq", Long.class);

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public QPlaylist(String variable) {
        super(Playlist.class, forVariable(variable));
    }

    public QPlaylist(Path<? extends Playlist> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPlaylist(PathMetadata metadata) {
        super(Playlist.class, metadata);
    }

}

