package com.a403.mmixx.playlist.model.service;

//import com.a403.mmixx.playlist.model.dto.PlaylistMusicListResponseDto;
import com.a403.mmixx.music.model.entity.MusicRepository;
import com.a403.mmixx.playlist.model.dto.*;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import com.a403.mmixx.playlist.model.entity.PlaylistMusicRepository;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import com.a403.mmixx.user.model.entity.UserRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import jdk.security.jarsigner.JarSigner;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.LinkedList;
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
    private PlaylistMusicRepository playlistMusicRepository;

    @Autowired
    private MusicRepository musicRepository;
    private UserRepository userRepository;

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
//java.lang.IllegalArgumentException: Can not set java.lang.Integer field com.a403.mmixx.user.model.entity.User.userSeq to java.lang.Integer
//        newPlaylist.setUserSeq(userSeq);
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
    public void addMusicToPlaylist(JsonObject jsonObjectForAddMusic) {

//        //  if jsonObject is null, return
//        if (jsonObjectForAddMusic == null) {
//            return;
//        }
//
//        PlaylistMusicRepository playlistMusicRepository = null;
//
//        Integer playlist_seq = jsonObjectForAddMusic.get("playlistSeq").getAsInt();
//        JsonArray originMusicList = jsonObjectForAddMusic.get("playlist_music").getAsJsonArray();
//        JsonArray concatMusicList = jsonObjectForAddMusic.get("music").getAsJsonArray();
//
//        List<PlaylistMusicDto> newPlaylistMusicList = new LinkedList<>();
//        //  기존 곡을 newPlaylistMusicList 에 담는다.
//        Integer maxSequence = 0;
//        for (int i = 0; i < originMusicList.size(); i++) {
//            Integer music_seq = originMusicList.get(i).getAsJsonObject().get("musicSeq").getAsInt();
//            Integer sequence = originMusicList.get(i).getAsJsonObject().get("sequence").getAsInt();
//            PlaylistMusicDto temp = new PlaylistMusicDto(music_seq, sequence);
//            if (maxSequence < sequence) {
//                maxSequence = sequence;
//            }
//            newPlaylistMusicList.add(temp);
//        }
//
//        for (int i = 0; i < concatMusicList.size(); i++) {
//            Integer music_seq = concatMusicList.get(i).getAsJsonObject().get("musicSeq").getAsInt();
//            Integer sequence = concatMusicList.get(i).getAsJsonObject().get("sequence").getAsInt();
//            PlaylistMusicDto temp = new PlaylistMusicDto(music_seq, sequence + maxSequence);
//            newPlaylistMusicList.add(temp);
//        }
//
//        //  기존 playlistMusic 삭제
//
//        for (int i = 0; i < newPlaylistMusicList.size(); i++) {
//            PlaylistMusicDto temp = newPlaylistMusicList.get(i);
//            playlistMusicRepository.insertByPlaylistSeqAndMusicSeqAndSequence(playlist_seq, temp.getMusicSeq(), temp.getSequence());
//        }
    }









    /**
     * 전체 플레이리스트 조회
     */
    public List<PlaylistDto> getGlobalPlaylist() {
        return playlistRepository.findByIsPrivateFalse().stream()
                .map(PlaylistDto::new).collect(Collectors.toList());
    }

    /**
     * 플레이리스트에 속한 노래 목록 조회
     */
    public PlaylistMusicDetailResponseDtoForRetrieve getPlaylistMusic(int seq) {
        Playlist playlist = playlistRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("Invalid playlistSeq"));
        List<PlaylistMusic> playlistMusic = playlistRepository.findByPlaylistSeq(seq);

        List<PlaylistMusicDto> playlistMusicDtos = playlistMusic.stream()
                .map(pm -> new PlaylistMusicDto(pm))
                .collect(Collectors.toList());

        return PlaylistMusicDetailResponseDtoForRetrieve.builder()
                .playlistSeq(seq)
                .playlistMusics(playlistMusicDtos)
                .build();
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


}
