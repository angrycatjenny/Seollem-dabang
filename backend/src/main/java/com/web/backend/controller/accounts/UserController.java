package com.web.backend.controller.accounts;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.answer.AnswerDao;
import com.web.backend.model.accounts.User;
import com.web.backend.payload.accounts.*;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.JwtTokenProvider;
import com.web.backend.security.UserPrincipal;
import com.web.backend.service.ImageStorageService;
import com.web.backend.service.KakaoVisionService;
import com.web.backend.service.VoiceStorageService;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@RequestMapping(value="/api")
@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDao userDao;

    @Autowired
    AnswerDao answerDao;

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
        if(userDao.existsByNickname(updateRequest.getNickname())){
            return ResponseEntity.ok(new ApiResponse(false, "Nickname is already exist!"));
        }

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
        recommendedUserList.removeAll(userDao.getUserByIdList(answerDao.findexaminerIdByexamineeId(user.getId())));
        return recommendedUserList;
    }

    @GetMapping("/recommend-user-by-keyword")
    public Object recUserByKeyword(@CurrentUser UserPrincipal requser){
        User curuser = userDao.getUserById(requser.getId());

        int gender = 0;
        if(curuser.getGender()==0){
            gender=1;
        }

        if(!curuser.getIsExam()){
            HashMap<String,Integer> nullData = new HashMap<String,Integer>();
            nullData.put("is_exam",0);
            nullData.put("gender",gender);
            return nullData;
        }


        //키워드 유사도 분석 시작
        System.out.println("Python Call");
        String stringId = String.valueOf(curuser.getId());
        String[] command = new String[3];
        command[0] = "python";
        command[1] = "/Users/multicampus/Desktop/PJT/PJT3/s03p31b103/backend/emotion_recognition/keyword_similarity.py";
        command[2] = stringId;
        ArrayList<Integer> simUserIdList = new ArrayList<>();

        try {
            CommandLine commandLine = CommandLine.parse(command[0]);
            for (int i = 1, n = command.length; i < n; i++) {
                commandLine.addArgument(command[i]);
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setStreamHandler(pumpStreamHandler);
            int result = executor.execute(commandLine);
            System.out.println("result: " + result);


            String[] array_word=outputStream.toString().split("");
            boolean flag = false;
            for(int i = 0; i < array_word.length; i++){
                if(array_word[i].equals(",")||array_word[i].equals(" ")){
                    continue;
                }
                if(array_word[i].equals("]")){
                    break;
                }
                if(flag){
                    int userId = Integer.parseInt(array_word[i]);
                    simUserIdList.add(userId);
                }
                if(array_word[i].equals("[")){
                    flag = true;
                }
            }
            System.out.println(simUserIdList);

        } catch (Exception e) {
            e.printStackTrace();
        }
        //키워드 유사도 분석 종료

        if(simUserIdList.size()>=5){
          simUserIdList = (ArrayList<Integer>) simUserIdList.subList(0,4);
        };

        ArrayList<User> recommendedUserList = new ArrayList<>();
        for(int i:simUserIdList){
            Long id = new Long(i);
            User recUser = userDao.getUserById(id);
            if(recUser.getGender()==gender){
                recommendedUserList.add(recUser);
            }
        }
        RecommendResponse userList = new RecommendResponse(curuser.getGender(), 1, recommendedUserList);
        return userList;

        //기존 코드
//        List<Keyword> keywords = keywordDao.findKeywordByUser(curuser);
//        List<User> allUsers = userDao.getUserByGenderAndIsExam(gender,true);
//        ArrayList<User> recommendedUserList = new ArrayList<>();
//        for(User user:allUsers){
//            List<String> othersKeywords = keywordDao.findWordByUserId(user.getId());
//            for(Keyword keyword:keywords){
//                if(othersKeywords.contains(keyword.getWord())){
//                    recommendedUserList.add(user);
//                    break;
//                }
//            }
//            if(recommendedUserList.toArray().length==4){
//                break;
//            }
//        }
//
//        boolean examExist = questionDao.existsByUserId(curuser.getId());
//        int isExam = 0;
//        if(examExist){
//            isExam=1;
//        }
//
//        HashMap<String,Integer> nullData = new HashMap<String,Integer>();
//        nullData.put("is_exam",isExam);
//        nullData.put("gender",curuser.getGender());
//
//        if(recommendedUserList.isEmpty()){
//            return nullData;
//        }
//
//        recommendedUserList.removeAll(userDao.getUserByIdList(answerDao.findexaminerIdByexamineeId(curuser.getId())));
//        RecommendResponse userList = new RecommendResponse(curuser.getGender(), isExam, recommendedUserList);
//        return userList;
        //기존 코드
    }
}