package com.web.backend.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.backend.model.accounts.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;

public class UserPrincipal implements UserDetails {

    private Long id;
    @JsonIgnore
    private String email;
    @JsonIgnore
    private String password;
    private String nickname;
    private String location;
    private int gender;
    private int age;

    public UserPrincipal(Long id, String email, String password, String nickname, String location, int gender, int age) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.location = location;
        this.gender = gender;
        this.age = age;
    }

    public static UserPrincipal create(User user) {
        return new UserPrincipal(user.getId(), user.getEmail(), user.getPassword(), user.getNickname(), user.getLocation(), user.getGender(), user.getAge());
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
