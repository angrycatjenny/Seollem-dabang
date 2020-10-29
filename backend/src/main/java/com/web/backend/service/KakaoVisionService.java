package com.web.backend.service;

import com.web.backend.exception.ByteConvertException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.http.HttpClient;
import java.util.Map;

@Service
public class KakaoVisionService {

    @Autowired
    public KakaoVisionService() {}

    public void getResponse(MultipartFile image){

        ByteArrayResource resource;

        try {
            resource = new ByteArrayResource(image.getBytes());
        }catch (IOException e) {
            throw new ByteConvertException("Could not convert image to bytes");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK 3e743488472c0a7bef2c90074d8a9700");
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", resource);
        body.add("threshold", 0.7);

        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(body, headers);

        String url = "https://dapi.kakao.com/v2/vision/face/detect";

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
        System.out.println(response);
    }
}
