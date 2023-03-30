package com.a403.mmixx.playlist.model.service;

//import com.a403.mmixx.playlist.model.dto.PlaylistMusicListResponseDto;
import com.a403.mmixx.playlist.model.dto.*;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import com.a403.mmixx.playlist.model.entity.PlaylistMusicRepository;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private UserRepository userRepository;

    /**
     * DTO로 빈 플레이리스트 생성.
     * 최초 생성시 playlist만 생성하고, playlistMusic은 updatePlaylistMusic에서 생성
     */
    public void createEmptyPlaylist(PlaylistMusicRequestDtoForCreateAndModify requestDto) {
        User user = userRepository.findById(requestDto.getUserSeq())
                .orElseThrow(() -> new IllegalArgumentException("Invalid userSeq"));

        Playlist playlist = new Playlist();

        playlist.setUser(user);
        playlist.setPlaylistName(requestDto.getPlaylistName());
        playlist.setIsPrivate(requestDto.isPrivate());

        playlistRepository.save(playlist);
    }


    /**
     * JSON 객체를 받아 빈 플레이리스트 생성.
     * 최초 생성시 playlist만 생성하고, playlistMusic은 updatePlaylistMusic에서 생성
     */
    @Transactional
    public Playlist createEmptyPlaylistByJSON(JsonObject jsonObjectForCreatePlaylist, int userSeq) {

        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!userSeq = " + userSeq);
        log.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!userSeq= " + userSeq);

        Playlist playlist = new Playlist();

        String playlistName = jsonObjectForCreatePlaylist.get("playlist_name").getAsString();
        Boolean isPrivate = jsonObjectForCreatePlaylist.get("is_private").getAsBoolean();

        playlist.setUser(userRepository.findById(userSeq).orElseThrow(() -> new IllegalArgumentException("Invalid userSeq")));
        playlist.setPlaylistName(playlistName);
        playlist.setIsPrivate(isPrivate);

        playlistRepository.save(playlist);
        return playlist;
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
     * 플레이리스트 수정(업데이트), 곡 추가
     */
    public void updatePlaylistMusic(PlaylistMusicRequestDtoForCreateAndModify requestDto) {
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
