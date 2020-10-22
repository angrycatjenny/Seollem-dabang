package com.web.backend.model.accounts;

import com.web.backend.model.audit.DateAudit;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }), @UniqueConstraint(columnNames = { "nickname" })})
public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    @NotBlank
    @Size(max = 20)
    private String nickname;

    @NotBlank
    @Size(max = 10)
    private String location;

    @NotBlank
    private int gender;

    @NotBlank
    private int age;

    public User() { }

    public User(String email, String password, String nickname, String location, int gender, int age) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.location = location;
        this.gender = gender;
        this.age = age;
    }

    public Long getUserId() {
        return id;
    }

    public void setUserId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return email;
    }

    public void setUserEmail(String email) {
        this.email = email;
    }

    public String getUserPassword() {
        return password;
    }

    public void setUserPassword(String password) {
        this.password = password;
    }

    public String getUserNickname() {
        return nickname;
    }

    public void setUserNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUserLocation() {
        return location;
    }

    public void setUserLocation(String location) {
        this.location = location;
    }

    public int getUserGender() {
        return gender;
    }

    public void setUserGender(int gender) {
        this.gender =gender;
    }

    public int getUserAge() {
        return age;
    }

    public void setUserAge(int age) {
        this.age = age;
    }
}
