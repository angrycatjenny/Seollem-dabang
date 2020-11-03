package com.web.backend.controller.accounts;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.keyword.KeywordDao;
import com.web.backend.dao.question.QuestionDao;
import com.web.backend.model.Keyword.Keyword;
import com.web.backend.model.accounts.User;
import com.web.backend.payload.accounts.*;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.JwtTokenProvider;
import com.web.backend.security.UserPrincipal;
import com.web.backend.service.ImageStorageService;
import com.web.backend.service.KakaoVisionService;
import com.web.backend.service.VoiceStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.lang.reflect.Array;
import java.net.URI;
import java.util.*;

@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDao userDao;

    @Autowired
    KeywordDao keywordDao;

    @Autowired
    QuestionDao questionDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    ImageStorageService imageStorageService;

    @Autowired
    VoiceStorageService voiceStorageService;

    @Autowired
    KakaoVisionService kakaoVisionService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        Optional<User> user = userDao.findByEmail(loginRequest.getEmail());

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestPart(required = false) MultipartFile image, @RequestPart(required = false) MultipartFile voice, SignUpRequest signUpRequest){

        if(image == null) {
            return ResponseEntity.ok(new ApiResponse(false, "Picture could not found"));
        }
        if(!kakaoVisionService.getResponse(image)) {
            return ResponseEntity.ok(new ApiResponse(false, "This picture has no face!"));
        }
        if(userDao.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.ok(new ApiResponse(false, "Email is already exist!"));
        }
        if(userDao.existsByNickname(signUpRequest.getNickname())) {
            return ResponseEntity.ok(new ApiResponse(false, "Nickname is already exist!"));
        }

        String imageName = imageStorageService.storeFile(image);
        String voiceName = voiceStorageService.storeFile(voice);

        String imageDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/").path(imageName).toUriString();
        String voiceDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/voice/").path(voiceName).toUriString();

        User user = new User(signUpRequest.getEmail(), signUpRequest.getPassword(), signUpRequest.getNickname(), signUpRequest.getLocation(), signUpRequest.getGender(), signUpRequest.getAge());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setImage(imageName);
        user.setImageDownloadUri(imageDownloadUri);
        user.setVoice(voiceName);
        user.setVoiceDownloadUri(voiceDownloadUri);

        User result = userDao.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/{id}").buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("/image/{imageName:.+}")
    public ResponseEntity<Resource> downloadImage(@PathVariable String imageName, HttpServletRequest request) {

        Resource resource = imageStorageService.loadFileAsResource(imageName);

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch (IOException e) {
            logger.info("Could not determine file type");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + resource.getFilename() + "\"").body(resource);
    }

    @GetMapping("/voice/{voiceName:.+}")
    public ResponseEntity<Resource> downloadVoice(@PathVariable String voiceName, HttpServletRequest request) {

        Resource resource = voiceStorageService.loadFileAsResource(voiceName);

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch (IOException e) {
            logger.info("Could not determine file type");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + resource.getFilename() + "\"").body(resource);
    }

    @GetMapping("/my-profile")
    public ResponseEntity<?> getMyInfo(@CurrentUser UserPrincipal requestUser) {
        User user = userDao.getUserById(requestUser.getId());
        return ResponseEntity.ok(user);
    }

    @PutMapping("/my-profile")
    public ResponseEntity<?> updateMyInfo(@CurrentUser UserPrincipal requestUser, UpdateRequest updateRequest, @RequestPart(required = false) MultipartFile image, @RequestPart(required = false) MultipartFile voice) {

        if(image != null && !kakaoVisionService.getResponse(image)) {
            return ResponseEntity.ok(new ApiResponse(false, "This picture has no face!"));
        }
        
        User user = userDao.getUserById(requestUser.getId());
        user.setNickname(updateRequest.getNickname());
        user.setLocation(updateRequest.getLocation());

        if(image != null) {
            String imageName = imageStorageService.storeFile(image);
            String imageDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/").path(imageName).toUriString();
            user.setImage(imageName);
            user.setImageDownloadUri(imageDownloadUri);
        }
        if(voice != null) {
            String voiceName = voiceStorageService.storeFile(voice);
            String voiceDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/voice/").path(voiceName).toUriString();
            user.setVoice(voiceName);
            user.setVoiceDownloadUri(voiceDownloadUri);
        }
        userDao.save(user);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/your-profile/{user_id}")
    public ResponseEntity<?> getYourInfo(@PathVariable("user_id") Long userId) {
        User user = userDao.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/recommend-user-by-profile")
    public Object recUserByProfile(@CurrentUser UserPrincipal requser){
        User user = userDao.getUserById(requser.getId());
        int age = user.getAge();
        int gender = user.getGender();
        if(gender==1){
            gender=0;
        }else{
            gender=1;
        }
        String address = user.getLocation();
        List<User> recommendedUserList = userDao.findUserByProfile(age-3,age+3,address,gender);

        recommendedUserList.remove(user);
        return recommendedUserList;
    }

    @GetMapping("/recommend-user-by-keyword")
    public Object recUserByKeyword(@CurrentUser UserPrincipal requser){
        User curuser = userDao.getUserById(requser.getId());
        List<Keyword> keywords = keywordDao.findKeywordByUser(curuser);

        int gender = 0;
        if(curuser.getGender()==0){
            gender=1;
        }
        
        List<User> allUsers = userDao.getUserByGender(gender);
        allUsers.remove(curuser);
        ArrayList<User> recommendedUserList = new ArrayList<>();
        for(User user:allUsers){
            List<String> othersKeywords = keywordDao.findWordByUserId(user.getId());
            System.out.println(othersKeywords);
            for(Keyword keyword:keywords){
                if(othersKeywords.contains(keyword.getWord())){
                    recommendedUserList.add(user);
                    break;
                }
            }
            if(recommendedUserList.toArray().length==4){
                break;
            }
        }

        boolean examExist = questionDao.existsByUserId(curuser.getId());
        int isExam = 0;
        if(examExist){
            isExam=1;
        }

        HashMap<String,Integer> nullData = new HashMap<String,Integer>();
        nullData.put("is_exam",isExam);
        nullData.put("gender",curuser.getGender());

        if(recommendedUserList.isEmpty()){
            return nullData;
        }
        
        RecommendResponse userList = new RecommendResponse(curuser.getGender(), isExam, recommendedUserList);
        return userList;
    }
}