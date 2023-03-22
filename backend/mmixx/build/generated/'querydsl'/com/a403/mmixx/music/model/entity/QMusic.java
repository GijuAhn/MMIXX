package com.a403.mmixx.music.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMusic is a Querydsl query type for Music
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMusic extends EntityPathBase<Music> {

    private static final long serialVersionUID = -745372200L;

    public static final QMusic music = new QMusic("music");

    public final StringPath albumName = createString("albumName");

    public final StringPath coverImage = createString("coverImage");

    public final NumberPath<Integer> edited = createNumber("edited", Integer.class);

    public final NumberPath<Integer> genreSeq = createNumber("genreSeq", Integer.class);

    public final NumberPath<Integer> mixed = createNumber("mixed", Integer.class);

    public final StringPath musicianName = createString("musicianName");

    public final NumberPath<Integer> musicLength = createNumber("musicLength", Integer.class);

    public final StringPath musicName = createString("musicName");

    public final NumberPath<Integer> musicSeq = createNumber("musicSeq", Integer.class);

    public final StringPath musicUrl = createString("musicUrl");

    public final NumberPath<Integer> userSeq = createNumber("userSeq", Integer.class);

    public QMusic(String variable) {
        super(Music.class, forVariable(variable));
    }

    public QMusic(Path<? extends Music> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMusic(PathMetadata metadata) {
        super(Music.class, metadata);
    }

}

