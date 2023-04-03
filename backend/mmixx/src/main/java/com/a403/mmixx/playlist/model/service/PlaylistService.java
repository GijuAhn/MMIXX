package com.a403.mmixx.playlist.model.service;

import com.a403.mmixx.playlist.model.dto.FavoriteRequestDto;
//import com.a403.mmixx.playlist.model.dto.PlaylistMusicListResponseDto;
import com.a403.mmixx.playlist.model.dto.FindFavoriteDto;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.entity.MusicRepository;
import com.a403.mmixx.playlist.model.dto.PlaylistDto;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicDetailResponseDtoForRetrieve;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicDto;

import com.a403.mmixx.playlist.model.entity.Favorite;
import com.a403.mmixx.playlist.model.entity.FavoriteRepository;
import com.a403.mmixx.playlist.model.dto.PlaylistMusicRequestDtoForAddMusic;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import com.a403.mmixx.playlist.model.entity.PlaylistMusicRepository;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;
    @Autowired
    private PlaylistMusicRepository playlistMusicRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    //  JSON from Frontend - Example
    /*
    {
    "playlist_name":"플리이름",
    "is_private":true,
    "user_seq":6,
    "playlist_music":[
        {
            "music_seq":1,
            "sequence":1
        },
        {
            "music_seq":2,
            "sequence":2
        }
    ]
    }
     */

    /**
     * 빈 플레이리스트 생성 + 생성된 플레이리스트에 곡 리스트 추가한 후 DB 저장까지
     *
     * @param requestDto
     * @param userSeq
     */
    @Transactional
    public void createPlaylist(@RequestBody PlaylistDto requestDto, int userSeq) {

        // check requestDto got from frontend
        log.info("requestDto: " + requestDto);
        log.info("playlistName: " + requestDto.getPlaylistName());
        log.info("isPrivate: " + requestDto.getIsPrivate());
        log.info("userSeq: " + requestDto.getUserSeq());
        log.info("playlistMusic: " + requestDto.getPlaylistMusic());


        //  PART1: empty playlist create
        Playlist newPlaylist = new Playlist();
        newPlaylist.setPlaylistName(requestDto.getPlaylistName());
        newPlaylist.setIsPrivate(requestDto.getIsPrivate());
        newPlaylist.setUser(userRepository.findById(userSeq).orElse(null));
        playlistRepository.save(newPlaylist);
        log.info("[1/6] !!empty playlist created successfully!!");

        // get last increment playlist_seq
        Integer playlistSeq = newPlaylist.getPlaylistSeq();
        log.info("playlistSeq: " + playlistSeq);
        log.info("[2/6]!!playlistSeq(id) Retrieved successfully!!");

        //  PART2: playlist_music create
        List<PlaylistMusicDto> playlistMusicList = requestDto.getPlaylistMusic();

        for (int i = 0; i < playlistMusicList.size(); i++) {
            PlaylistMusic newPlaylistMusic = new PlaylistMusic();

//"org.springframework.orm.jpa.JpaSystemException: Error accessing field [private java.lang.Integer com.a403.mmixx.music.model.entity.Music.musicSeq] by reflection for persistent property
//            newPlaylistMusic.setPlaylistSeq(playlistSeq);
//            newPlaylistMusic.setSequence(playlistMusicList.get(i).getSequence());
//            newPlaylistMusic.setMusicSeq(playlistMusicList.get(i).getMusicSeq());

            newPlaylistMusic.setPlaylist(playlistRepository.findById(playlistSeq).orElse(null));
            log.info("[3/6] !!playlistMusic object from JSON setting done!!");
            newPlaylistMusic.setMusic(musicRepository.findById(playlistMusicList.get(i).getMusicSeq()).orElse(null));
            log.info("[4/6] !!music_seq setting done!!");
            newPlaylistMusic.setSequence(playlistMusicList.get(i).getSequence());
            log.info("[5/6] !!sequence setting done!!");
            playlistMusicRepository.save(newPlaylistMusic);
            log.info("[6/6] !!playlistMusic objects (list) saved successfully!!");
        }

    }


    /**
     * 플레이리스트에 곡 추가
     */
    @Transactional
    public void addMusicToPlaylist(PlaylistMusicRequestDtoForAddMusic requestDto, String playlistSeq, String userSeq) {

        // get requestDto
        LinkedList<PlaylistMusicDto> oriPlaylistMusicDtoList = requestDto.getOriPlaylistMusicDtoList();
        LinkedList<PlaylistMusicDto> addPlaylistMusicDtoList = requestDto.getAddPlaylistMusicDtoList();
        log.info("oriPlaylistMusicDtoList: " + oriPlaylistMusicDtoList);
        log.info("addPlaylistMusicDtoList: " + addPlaylistMusicDtoList);

        // get max sequence number from oriPlaylistMusicDtoList
        int maxSequence = 0;
        for (int i = 0; i < oriPlaylistMusicDtoList.size(); i++) {
            if (maxSequence < oriPlaylistMusicDtoList.get(i).getSequence()) {
                maxSequence = oriPlaylistMusicDtoList.get(i).getSequence();
            }
        }

        // update sequence number of addPlaylistMusicDtoList (add maxSequence)
        for (int i = 0; i < addPlaylistMusicDtoList.size(); i++) {
            addPlaylistMusicDtoList.get(i).setSequence(
                    maxSequence + addPlaylistMusicDtoList.get(i).getSequence());
        }

        // save addPlaylistMusicDtoList to DB
        for (int i = 0; i < addPlaylistMusicDtoList.size(); i++) {
            PlaylistMusic newPlaylistMusic = new PlaylistMusic();
            newPlaylistMusic.setPlaylist(playlistRepository.findById(Integer.parseInt(playlistSeq)).orElse(null));
            newPlaylistMusic.setMusic(musicRepository.findById(addPlaylistMusicDtoList.get(i).getMusicSeq()).orElse(null));
            newPlaylistMusic.setSequence(addPlaylistMusicDtoList.get(i).getSequence());
            playlistMusicRepository.save(newPlaylistMusic);
        }

    }

    /**
     * (관리자용) private 여부 상관없이 모든 유저의 모든 플레이리스트를 조회
     */
    public List<Playlist> getAllPlaylist(int userSeq) {
        // check User.Role
        User user = userRepository.findById(userSeq).orElse(null);
        if (user.getRole().equals("ADMIN")) {
            return playlistRepository.findAll();
        } else {
            return null;
        }
    }


    // TODO: 조회시 순환참조 발생하는것같음. StackoverflowError 발생
    /**
     * Public 플레이리스트 조회, isPrivate = false 인 모든 항목을 조회한다.
     * ignore userSeq
     */
    public List<Playlist> getGlobalPlaylist() {
        return playlistRepository.findByIsPrivateFalse();
    }


    /**
     * Private 플레이리스트 조회 (userSeq 필요)
     */
    public List<Playlist> getPrivatePlaylist(int userSeq) {
        List<Playlist> playlistList = playlistRepository.findByIsPrivateTrue();
        for (int i = 0; i < playlistList.size(); i++) {
            if (playlistList.get(i).getUserSeq() != userSeq) {
                playlistList.remove(i);
            }
        }
        return playlistList;
    }




    /**
     * 플레이리스트에 속한 노래 목록 조회
     */
    public PlaylistMusicDetailResponseDtoForRetrieve getMusicListInPlaylist(int playlistSeq) {
        PlaylistMusicDetailResponseDtoForRetrieve responseDto = new PlaylistMusicDetailResponseDtoForRetrieve();

//        private int playlistSeq;
//        private List<PlaylistMusicDto> playlistMusics;
//        private List<MusicListResponseDto> musicList;

        // get playlistSeq
        responseDto.setPlaylistSeq(playlistSeq);
        log.info("playlistSeq: " + playlistSeq);

        // get playlistMusics
        //  여기서 해당 곡의 musicSeq, sequence를 가져옴

        List<PlaylistMusic> playlistMusicList = playlistRepository.findByPlaylistSeq(playlistSeq);
        List<PlaylistMusicDto> playlistMusicDtoList = new LinkedList<>();
        for (int i = 0; i < playlistMusicList.size(); i++) {
            PlaylistMusicDto playlistMusicDto = new PlaylistMusicDto();
            playlistMusicDto.setMusicSeq(playlistMusicList.get(i).getMusicSeq());
            playlistMusicDto.setSequence(playlistMusicList.get(i).getSequence());
            playlistMusicDtoList.add(playlistMusicDto);
            log.info("MusicSeq: " + playlistMusicList.get(i).getMusicSeq());
            log.info("Sequence: " + playlistMusicList.get(i).getSequence());
        }
        responseDto.setPlaylistMusics(playlistMusicDtoList);

        // get musicList
        //  여기서 해당 곡의 상세정보들을 가져옴
        List<MusicListResponseDto> musicListResponseDtoList = new LinkedList<>();
        for (int i = 0; i < playlistMusicDtoList.size(); i++) {
            MusicListResponseDto musicListResponseDto = new MusicListResponseDto();
            musicListResponseDto.setMusicSeq(playlistMusicDtoList.get(i).getMusicSeq());
            musicListResponseDto.setMusicName(musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicName());
            musicListResponseDto.setMusicianName(musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicianName());
            musicListResponseDto.setAlbumName(musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getAlbumName());
            musicListResponseDto.setMusicUrl(musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicUrl());
            musicListResponseDto.setCoverImage(musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getCoverImage());
            musicListResponseDto.setMusicLength(musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicLength());
            musicListResponseDtoList.add(musicListResponseDto);
            log.info("MusicSeq: " + playlistMusicDtoList.get(i).getMusicSeq());
            log.info("MusicName: " + musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicName());
            log.info("MusicianName: " + musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicianName());
            log.info("AlbumName: " + musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getAlbumName());
            log.info("MusicUrl: " + musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicUrl());
            log.info("CoverImage: " + musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getCoverImage());
            log.info("MusicLength: " + musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null).getMusicLength());
        }
        responseDto.setMusicList(musicListResponseDtoList);

        return responseDto;
    }

    /**
     * 플레이리스트 삭제 (playlist 에 포함된 music 까지 cascade)
     */
    public void deletePlaylist(int playlistSeq) {
        log.info("Delete Playlist... INIT");
        playlistRepository.deleteById(playlistSeq);
        log.info("Delete Playlist... DONE");
    }

//    public String getCoverImage(int seq) {
//        return "";
//    }
    
    public List<FindFavoriteDto> FindFavorite(int user_seq) {
//    	List<FindFavoriteDto> favorite_list = favoriteRepository.findAllByUser_UserSeq(user_seq);
//    	return favorite_list;
    	List<Favorite> favorite_list = favoriteRepository.findAllByUser_UserSeq(user_seq);
    	if(favorite_list != null) {
    		List<FindFavoriteDto> response = new ArrayList<>();
        	for(Favorite favo : favorite_list) {
        		FindFavoriteDto temp = new FindFavoriteDto(favo.getFavoriteSeq(), favo.getUser().getUserSeq(), favo.getPlaylist().getPlaylistSeq(), favo.getPlaylist().getPlaylistName(), favo.getPlaylist().getIsPrivate());
        		response.add(temp);
        	}
        	return response;
    	} else {
    		return null;
    	}
    }

    @Transactional
    public String insertFavorite(FavoriteRequestDto favoriteRequestDto) {
    	Favorite favo = favoriteRepository.findByUser_UserSeqAndPlaylist_PlaylistSeq(favoriteRequestDto.getUser_seq(), favoriteRequestDto.getPlaylist_seq());
    	if(favo == null) {
//    		Favorite favorite = new Favorite(favoriteRequestDto.getUser_seq(), favoriteRequestDto.getPlaylist_seq());
    		Favorite favorite = new Favorite(new User(favoriteRequestDto.getUser_seq()), new Playlist(favoriteRequestDto.getPlaylist_seq()));
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
    		favoriteRepository.deleteByUser_UserSeqAndPlaylist_PlaylistSeq(user_seq, playlist_seq);
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
