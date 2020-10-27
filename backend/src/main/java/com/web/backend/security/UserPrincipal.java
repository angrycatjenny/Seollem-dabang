package com.web.backend.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.backend.model.accounts.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;

public class UserPrincipal implements UserDetails {

    private final Long id;
    @JsonIgnore
    private final String email;
    @JsonIgnore
    private final String password;
    private final String nickname;
    private final String location;
    private final int gender;
    private final int age;
    private final String image;
    private final String voice;

    public UserPrincipal(Long id, String email, String password, String nickname, String location, int gender, int age, String image, String voice) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.location = location;
        this.gender = gender;
        this.age = age;
        this.image = image;
        this.voice = voice;
    }

    public static UserPrincipal create(User user) {
        return new UserPrincipal(user.getId(), user.getEmail(), user.getPassword(), user.getNickname(), user.getLocation(), user.getGender(), user.getAge(), user.getImage(), user.getVoice());
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getNickname() {
        return nickname;
    }

    public String getLocation() {
        return location;
    }

    public int getGender() { return gender; }

    public int getAge() { return age; }

    public String getImage() { return image; }

    public String getVoice() { return voice; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
