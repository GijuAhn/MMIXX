package com.a403.mmixx.genre.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGenre is a Querydsl query type for Genre
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGenre extends EntityPathBase<Genre> {

    private static final long serialVersionUID = -400859880L;

    public static final QGenre genre = new QGenre("genre");

    public final NumberPath<Integer> genreCategory = createNumber("genreCategory", Integer.class);

    public final StringPath genreInfo = createString("genreInfo");

    public final StringPath genreName = createString("genreName");

    public final NumberPath<Integer> genreSeq = createNumber("genreSeq", Integer.class);

    public final StringPath genreSummary = createString("genreSummary");

    public QGenre(String variable) {
        super(Genre.class, forVariable(variable));
    }

    public QGenre(Path<? extends Genre> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGenre(PathMetadata metadata) {
        super(Genre.class, metadata);
    }

}

