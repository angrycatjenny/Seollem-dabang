package com.web.backend.payload.question;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class QuestionRequest {
    int articleId;
    @NotNull
    String content;
    Boolean answer;
    int userId;
}
