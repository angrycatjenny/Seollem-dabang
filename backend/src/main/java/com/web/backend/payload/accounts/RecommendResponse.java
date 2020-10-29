package com.web.backend.payload.accounts;

import com.web.backend.model.accounts.User;

import java.util.List;

public class RecommendResponse {
    public RecommendResponse(){

    }

    public int gender;
    public int isExam;
    public List<User> userList;

    public RecommendResponse(int gender, int isExam, List<User> userList){
        this.gender=gender;
        this.isExam=isExam;
        this.userList=userList;

    }
}
