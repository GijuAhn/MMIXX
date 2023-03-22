package com.a403.mmixx.genre.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPreset is a Querydsl query type for Preset
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPreset extends EntityPathBase<Preset> {

    private static final long serialVersionUID = 727646698L;

    public static final QPreset preset = new QPreset("preset");

    public final StringPath coverImage = createString("coverImage");

    public final NumberPath<Integer> genreSeq = createNumber("genreSeq", Integer.class);

    public final NumberPath<Integer> musicLength = createNumber("musicLength", Integer.class);

    public final StringPath musicName = createString("musicName");

    public final StringPath musicUrl = createString("musicUrl");

    public final NumberPath<Integer> presetSeq = createNumber("presetSeq", Integer.class);

    public QPreset(String variable) {
        super(Preset.class, forVariable(variable));
    }

    public QPreset(Path<? extends Preset> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPreset(PathMetadata metadata) {
        super(Preset.class, metadata);
    }

}

