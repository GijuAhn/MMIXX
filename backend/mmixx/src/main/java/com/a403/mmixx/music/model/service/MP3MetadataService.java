package com.a403.mmixx.music.model.service;

import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.mp3.Mp3Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class MP3MetadataService {

    public Map<String, String> extractMetadata(MultipartFile file) throws Exception {
        Map<String, String> metadataMap = new HashMap<>();

        // Create a Tika parser and parse the MP3 file's metadata
        BodyContentHandler handler = new BodyContentHandler();
        Metadata metadata = new Metadata();
        InputStream stream = file.getInputStream();
        ParseContext parseContext = new ParseContext();

        Mp3Parser parser = new Mp3Parser();
        parser.parse(stream, handler, metadata, parseContext);

        // Extract the metadata fields and add them to the map
        metadataMap.put("musicName", metadata.get("title"));
        metadataMap.put("musicLength", metadata.get("xmpDM:duration"));
        metadataMap.put("musicianName", metadata.get("xmpDM:artist"));
        metadataMap.put("albumName", metadata.get("xmpDM:album"));

        //  print all metadata
        String[] metadataNames = metadata.names();
        for(String name : metadataNames){
            System.out.println(name + ": " + metadata.get(name));
        }

        return metadataMap;
    }

}
