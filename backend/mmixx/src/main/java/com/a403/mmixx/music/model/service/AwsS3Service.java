package com.a403.mmixx.music.model.service;

import java.awt.print.Pageable;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AwsS3Service {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3 amazonS3;
	private final String MUSIC_FOLDER = "/music";
	private final String IMAGE_FOLDER = "/images"; // TODO

	public ResponseEntity<byte[]> downloadMusic(String fileName) throws IOException {
		S3Object s3Object = amazonS3.getObject(new GetObjectRequest(bucket + MUSIC_FOLDER, fileName));
		S3ObjectInputStream objectInputStream = s3Object.getObjectContent();
		byte[] bytes = IOUtils.toByteArray(objectInputStream);

		String downloadFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		httpHeaders.setContentLength(bytes.length);
		httpHeaders.setContentDispositionFormData("attachment", downloadFileName); // 파일 이름 지정

		return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
	}

	public List<String> uploadMusic(List<MultipartFile> multipartFiles) {
		List<String> fileList = new ArrayList<>();

		// forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
		multipartFiles.forEach(file -> {
			String fileName = createFileName(file.getOriginalFilename());
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(file.getSize());
			metadata.setContentType(file.getContentType());

			try(InputStream inputStream = file.getInputStream()) {
				amazonS3.putObject(new PutObjectRequest(bucket + MUSIC_FOLDER, fileName, inputStream, metadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
			} catch(IOException e) {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
			}

			// fileList.add(fileName);
			fileList.add(amazonS3.getUrl(bucket + MUSIC_FOLDER, fileName).toString());
		});

		return fileList;
	}

	public void deleteMusic(String fileName) {
		// amazonS3.deleteObject(bucket, fileName);
		amazonS3.deleteObject(new DeleteObjectRequest(bucket + MUSIC_FOLDER, fileName));
	}



	private MediaType contentType(String keyName) {
		String[] arr = keyName.split("\\.");
		String type = arr[arr.length - 1];
		switch (type) {
			case "png":
				return MediaType.IMAGE_PNG;
			case "jpg":
				return MediaType.IMAGE_JPEG;
			default:
				return MediaType.APPLICATION_OCTET_STREAM;
		}
	}

	private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}

	private String getFileExtension(String fileName) { // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였습니다.
		try {
			return fileName.substring(fileName.lastIndexOf("."));
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}
}
