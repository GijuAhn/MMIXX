package com.a403.mmixx.music.model.entity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;

// @RequiredArgsConstructor
public class MusicRepositoryCustomImpl implements MusicRepositoryCustom {
	// private final JPAQueryFactory queryFactory;
	@Override
	public Page<MusicListResponseDto> getMusicListByCondition(MusicCondition condition, Pageable pageable) {
		// List<MusicListResponseDto> content = queryFactory
		// 	.select(new QMusicListResponseDto(music))
		// 	.from(Music)
		// 	.where(titleContaining(condition.getTitle()),
		// 		contentContaining(condition.getContent()),
		// 		writerContaining(condition.getWriter()))
		// 	.offset(pageable.getOffset())
		// 	.limit(pageable.getPageSize())
		// 	.orderBy(board.createdAt.desc())
		// 	.fetch();
		//
		// Long resultCount = queryFactory
		// 	.select(board.count())
		// 	.from(board)
		// 	.where(titleContaining(condition.getTitle()),
		// 		contentContaining(condition.getContent()),
		// 		writerContaining(condition.getWriter()))
		// 	.fetchOne();
		// resultCount = (resultCount == null) ? 0 : resultCount;
		// return new PageImpl<>(content, pageable, resultCount);
		return null;
	}

	// private BooleanExpression titleContaining(String title) {
	// 	return isEmpty(title) ? null : board.title.contains(title);
	// }
	//
	// private BooleanExpression contentContaining(String content) {
	// 	return isEmpty(content) ? null : board.content.contains(content);
	// }
	//
	// private BooleanExpression writerContaining(String writer) {
	// 	return isEmpty(writer) ? null : board.writer.contains(writer);
	// }

}
