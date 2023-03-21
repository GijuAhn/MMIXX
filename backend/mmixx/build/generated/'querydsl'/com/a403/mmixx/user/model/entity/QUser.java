package com.a403.mmixx.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -812297986L;

    public static final QUser user = new QUser("user");

    public final StringPath email = createString("email");

    public final StringPath profileImageUrl = createString("profileImageUrl");

    public final EnumPath<com.a403.mmixx.auth.entity.Role> role = createEnum("role", com.a403.mmixx.auth.entity.Role.class);

    public final StringPath token = createString("token");

    public final StringPath userName = createString("userName");

    public final NumberPath<Integer> userSeq = createNumber("userSeq", Integer.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

