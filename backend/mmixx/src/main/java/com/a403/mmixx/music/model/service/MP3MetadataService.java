package com.a403.mmixx.music.model.service;

import com.a403.mmixx.music.model.entity.Music;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.mp3.Mp3Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MP3MetadataService {

    public static List<Music> extractMetadataFromMultipartFileList(List<MultipartFile> multipartFiles) throws Exception {

        List<Music> musicContainerList = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            Music musicContainer = new Music();
            Map<String, String> metadataMap = extractMetadata(multipartFile);
            musicContainer.setMusicName(metadataMap.get("musicName"));
            musicContainer.setMusicLength((int) Math.ceil(Double.valueOf(metadataMap.get("musicLength")) * 1000));
            musicContainer.setMusicianName(metadataMap.get("musicianName"));
            musicContainer.setAlbumName(metadataMap.get("albumName"));
            musicContainerList.add(musicContainer);
        }

        //  print all metadata (filtered data check)
        for (Music music : musicContainerList) {
            System.out.println("<musicName> : " + music.getMusicName());
            System.out.println("<musicLength> : " + music.getMusicLength() + "(milliseconds)");
            System.out.println("<musicianName> : " + music.getMusicianName());
            System.out.println("<albumName> : " + music.getAlbumName());
        }

        return musicContainerList;
    }

    public static Map<String, String> extractMetadata(MultipartFile file) throws Exception {
        // Convert multipart file to MP3 file
        File mp3File = Files.createTempFile("temp", ".mp3").toFile();

        //  print file's location (path) for debugging
        System.out.println(mp3File.getAbsolutePath());


        file.transferTo(mp3File);

        Map<String, String> metadataMap = new HashMap<>();

        // Create a Tika parser and parse the MP3 file's metadata
        BodyContentHandler handler = new BodyContentHandler();
        Metadata metadata = new Metadata();

        // File to InputStream
        InputStream stream = new FileInputStream(mp3File);
        ParseContext parseContext = new ParseContext();
        Mp3Parser parser = new Mp3Parser();
        parser.parse(stream, handler, metadata, parseContext);

        // Extract the metadata fields and add them to the map
        metadataMap.put("musicName", metadata.get("title"));
        metadataMap.put("musicLength", metadata.get("xmpDM:duration"));
        metadataMap.put("musicianName", metadata.get("xmpDM:artist"));
        metadataMap.put("albumName", metadata.get("xmpDM:album"));

        //  print all metadata (raw data check)
        String[] metadataNames = metadata.names();
        for(String name : metadataNames){
            System.out.println(name + ": " + metadata.get(name));
        }

        // Delete temporary MP3 file
//        mp3File.delete();
        return metadataMap;
    }

}
