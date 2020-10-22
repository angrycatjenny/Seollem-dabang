package com.web.backend.controller.accounts;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.model.accounts.User;
import com.web.backend.payload.accounts.ApiResponse;
import com.web.backend.payload.accounts.JwtAuthenticationResponse;
import com.web.backend.payload.accounts.LoginRequest;
import com.web.backend.payload.accounts.SignUpRequest;
import com.web.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDao userDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

        if(userDao.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email is already exist!"), HttpStatus.BAD_REQUEST);
        }
        if(userDao.existsByNickname(signUpRequest.getNickname())) {
            return new ResponseEntity(new ApiResponse(false, "Nickname is already exist!"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getEmail(), signUpRequest.getPassword(), signUpRequest.getNickname(), signUpRequest.getLocation(), signUpRequest.getGender(), signUpRequest.getAge());
        User result = userDao.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/{id}").buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
