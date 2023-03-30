package com.a403.mmixx.playlist.model.service;

import com.a403.mmixx.playlist.model.dto.FavoriteRequestDto;
//import com.a403.mmixx.playlist.model.dto.PlaylistMusicListResponseDto;
import com.a403.mmixx.playlist.model.dto.PlaylistDto;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicDto;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicRequestDto;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicResponseDto;
import com.a403.mmixx.playlist.model.entity.Favorite;
import com.a403.mmixx.playlist.model.entity.FavoriteRepository;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;
import com.beust.ah.A;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FavoriteRepository favoriteRepository;

    /**
     * 전체 플레이리스트 조회
     */
    public List<PlaylistDto> getPlaylist() {
        return playlistRepository.findByIsPrivateFalse().stream()
                .map(PlaylistDto::new).collect(Collectors.toList());
    }

    /**
     * 플레이리스트에 속한 노래 목록 조회
     */
    public PlaylistMusicResponseDto getPlaylistMusic(int seq) {
        Playlist playlist = playlistRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("Invalid playlistSeq"));
        List<PlaylistMusic> playlistMusic = playlistRepository.findByPlaylistSeq(seq);

        List<PlaylistMusicDto> playlistMusicDtos = playlistMusic.stream()
                .map(pm -> new PlaylistMusicDto(pm))
                .collect(Collectors.toList());

        return PlaylistMusicResponseDto.builder()
                .playlistSeq(seq)
                .playlistMusic(playlistMusicDtos)
                .build();
    }

    public void save(PlaylistMusicRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserSeq())
                .orElseThrow(() -> new IllegalArgumentException("Invalid userSeq"));

        Playlist playlist = new Playlist();
    }

    /**
     * 플레이리스트 삭제
     */
    public void deletePlaylist(int id) {
        Optional<Playlist> playlist = playlistRepository.findById(id);

        if (playlist != null) {
            playlistRepository.deleteById(id);
        }
    }

//    public String getCoverImage(int seq) {
//        return "";
//    }
    
    @Transactional
    public String insertFavorite(FavoriteRequestDto favoriteRequestDto) {
    	Favorite favo = favoriteRepository.findByUserSeqAndPlaylistSeq(favoriteRequestDto.getUser_seq(), favoriteRequestDto.getPlaylist_seq());
    	if(favo == null) {
    		Favorite favorite = new Favorite(favoriteRequestDto.getUser_seq(), favoriteRequestDto.getPlaylist_seq());
        	favoriteRepository.save(favorite);
        	return "SUCCESS";
    	} else {
    		return "EXIST";
    	}
    }
    
    @Transactional
    public String deleteFavorite(int user_seq, int playlist_seq) {
    	try {
    		log.info("****** Favorite DB Delete Start ******");
    		favoriteRepository.deleteByUserSeqAndPlaylistSeq(user_seq, playlist_seq);
    		log.info("****** Favorite DB Delete End ******");
    	} catch(Exception e) {
    		System.out.println(e);
    		e.printStackTrace();
    		return "FAIL";
    	}
    	log.info("****** Favorite DB Delete SUCCESS ******");
    	return "SUCCESS";
    }
}
