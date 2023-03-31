package com.a403.mmixx.music.model.service;

import com.a403.mmixx.music.model.entity.Music;

import lombok.extern.slf4j.Slf4j;

import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.mp3.Mp3Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class MP3MetadataService {

    public static List<Music> extractMetadataFromMultipartFileList(List<MultipartFile> multipartFiles) throws Exception {

        List<Music> musicContainerList = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            Music musicContainer = new Music();
            Map<String, String> metadataMap = extractMetadata(multipartFile);
            //  if musicName is null, set musicName to its own file name
            if (metadataMap.get("musicName") == null) {
            	byte[] euckrStringBuffer = multipartFile.getOriginalFilename().getBytes(Charset.forName("euc-kr"));
            	String decodedFromEucKr = new String(euckrStringBuffer, "euc-kr");
            	byte[] utf8StringBuffer = decodedFromEucKr.getBytes("utf-8");
            	String decodedFromUtf8 = new String(utf8StringBuffer, "utf-8");
            	System.out.println("decodedFromUtf8 : " + decodedFromUtf8);
                musicContainer.setMusicName(decodedFromUtf8);
//                musicContainer.setMusicName(multipartFile.getOriginalFilename());
            } else {
                musicContainer.setMusicName(metadataMap.get("musicName"));
            }
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
//        metadataMap.put("musicName", euckrToUtf8(metadata.get("title")));
//        metadataMap.put("musicLength", metadata.get("xmpDM:duration"));
//        metadataMap.put("musicianName", euckrToUtf8(metadata.get("xmpDM:artist")));
//        metadataMap.put("albumName", euckrToUtf8(metadata.get("xmpDM:album")));
        System.out.println("*********************************************************************************");
        System.out.println("metadata.get(\"title\") : " + metadata.get("title"));
        byte[] euckrStringBuffer = metadata.get("title").getBytes(Charset.forName("euc-kr"));
    	String decodedFromEucKr = new String(euckrStringBuffer, "euc-kr");
    	System.out.println("decodedFromEucKr : " + decodedFromEucKr);
    	
		byte[] utf8StringBuffer1 = metadata.get("title").getBytes("utf-8");
    	String decodedFromUtf81 = new String(utf8StringBuffer1, "utf-8");
    	System.out.println("decodedFromUtf81 : " + decodedFromUtf81);
    	
    	byte[] utf8StringBuffer = decodedFromEucKr.getBytes("utf-8");
    	String decodedFromUtf8 = new String(utf8StringBuffer, "utf-8");
    	System.out.println("decodedFromUtf8 : " + decodedFromUtf8);
    	
    	String[] charSet = {"utf-8", "euc-kr", "ksc5601", "iso-8859-1", "x-windows-949"};
    	for(int i = 0; i<charSet.length; i++) {
    		for(int j = 0; j<charSet.length; j++) {
				System.out.println("[" + charSet[i] + "," + charSet[j] + "]" + new String(metadata.get("title").getBytes(charSet[i]), charSet[j]));
    		}
    	}
    	System.out.println("*********************************************************************************");
    	
        metadataMap.put("musicName", new String(metadata.get("title").getBytes("iso-8859-1"), "euc-kr"));
        metadataMap.put("musicLength", metadata.get("xmpDM:duration"));
        metadataMap.put("musicianName", new String(metadata.get("xmpDM:artist").getBytes("iso-8859-1"), "euc-kr"));
        metadataMap.put("albumName", new String(metadata.get("xmpDM:album").getBytes("iso-8859-1"), "euc-kr"));

        //  print all metadata (raw data check)
        String[] metadataNames = metadata.names();
        for(String name : metadataNames){
            System.out.println(name + ": " + metadata.get(name));
        }

        // Delete temporary MP3 file
        // TODO: cleanup '.tmp' garbage files...
//        mp3File.delete();
        return metadataMap;
    }

    public static String euckrToUtf8(String data) {
    	if(data != null) {
//    		byte[] euckrStringBuffer = data.getBytes(Charset.forName("euc-kr"));
//        	String decodedFromEucKr = new String(euckrStringBuffer, "euc-kr");
//			byte[] utf8StringBuffer = decodedFromEucKr.getBytes("utf-8");
//        	String decodedFromUtf8 = new String(utf8StringBuffer, "utf-8");
//        	System.out.println("decodedFromUtf8 : " + decodedFromUtf8);
    		
			try {
	        	return new String(data.getBytes("iso-8859-1"), "euc-kr");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
				return null;
			}
    	} else {
    		return null;
    	}
    }
}
