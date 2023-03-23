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
        metadataMap.put("Title", metadata.get("title"));
        metadataMap.put("Artist", metadata.get("xmpDM:artist"));
        metadataMap.put("Album", metadata.get("xmpDM:album"));
        metadataMap.put("Genre", metadata.get("xmpDM:genre"));
        metadataMap.put("Year", metadata.get("xmpDM:releaseDate"));

        // Extract the album art image data and save it to a file -> ALBUM_ART IS NOT INCLUDED IN THE DAMN METADATA
//        byte[] albumArtData = metadata.get("metadata:thumbnail").getBytes();
//        String filename = "album_art.jpg";
//        FileOutputStream outputStream = new FileOutputStream(filename);
//        outputStream.write(albumArtData);
//        outputStream.close();

        return metadataMap;
    }

}
