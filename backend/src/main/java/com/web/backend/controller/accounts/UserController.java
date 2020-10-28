package com.web.backend.controller.accounts;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.keyword.KeywordDao;
import com.web.backend.model.Keyword.Keyword;
import com.web.backend.model.accounts.User;
import com.web.backend.payload.accounts.ApiResponse;
import com.web.backend.payload.accounts.JwtAuthenticationResponse;
import com.web.backend.payload.accounts.LoginRequest;
import com.web.backend.payload.accounts.SignUpRequest;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.JwtTokenProvider;
import com.web.backend.security.UserPrincipal;
import com.web.backend.service.ImageStorageService;
import com.web.backend.service.VoiceStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

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
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    ImageStorageService imageStorageService;

    @Autowired
    VoiceStorageService voiceStorageService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        Optional<User> user = userDao.findByEmail(loginRequest.getEmail());

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestPart(required = false) MultipartFile image, @RequestPart(required = false) MultipartFile voice, SignUpRequest signUpRequest) {

        if(userDao.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email is already exist!"), HttpStatus.BAD_REQUEST);
        }
        if(userDao.existsByNickname(signUpRequest.getNickname())) {
            return new ResponseEntity(new ApiResponse(false, "Nickname is already exist!"), HttpStatus.BAD_REQUEST);
        }

        String imageName = imageStorageService.storeFile(image);
        String voiceName = voiceStorageService.storeFile(voice);

        User user = new User(signUpRequest.getEmail(), signUpRequest.getPassword(), signUpRequest.getNickname(), signUpRequest.getLocation(), signUpRequest.getGender(), signUpRequest.getAge());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setImage(imageName);
        user.setVoice(voiceName);

        User result = userDao.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/{id}").buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("/my-profile")
    public ResponseEntity<?> getMyInfo(@CurrentUser UserPrincipal requestUser) {
        User user = userDao.getUserById(requestUser.getId());

        return ResponseEntity.ok(user);
    }

    @GetMapping("/your-profile/{user_id}")
    public ResponseEntity<?> getYourInfo(@PathVariable("user_id") Long userId) {
        User user = userDao.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/recommend-user-by-profile")
    public Object getUserByProfile(@CurrentUser UserPrincipal requser){
        User user = userDao.getUserById(requser.getId());
        int age = user.getAge();
        int gender = user.getGender();
        if(gender==1){
            gender=0;
        }else{
            gender=1;
        }
        String address = user.getLocation();
        List<User> recommendedUserList = userDao.getUserByAgeAndGenderAndLocation(age,gender,address);
        recommendedUserList.remove(user);
        return recommendedUserList;
    }

    @GetMapping("/recommend-user-by-keyword")
    public Object getUserByKeyword(@CurrentUser UserPrincipal requser){
        User curuser = userDao.getUserById(requser.getId());
        List<Keyword> keywords = keywordDao.findKeywordByUser(curuser);
        List<User> allUsers = userDao.findAll();
        allUsers.remove(curuser);
        List<User> recommendedUserList = null;
        for(User user:allUsers){
            List<Keyword> othersKeywords = keywordDao.findKeywordByUser(user);
            for(Keyword keyword:keywords){
                if(othersKeywords.contains(keyword)){
                    recommendedUserList.add(user);
                }
            }
        }
        return recommendedUserList;
    }
}
