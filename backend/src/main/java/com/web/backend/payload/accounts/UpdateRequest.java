package com.web.backend.payload.accounts;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UpdateRequest {

    @NotBlank
    @Size(min = 2, max = 10)
    private String nickname;

    @NotBlank
    @Size(max = 10)
    private String location;

    public String getNickname() { return nickname; }

    public void setNickname(String nickname) { this.nickname = nickname; }

    public String getLocation() {  return location; }

    public void setLocation(String location) { this.location = location; }
}
