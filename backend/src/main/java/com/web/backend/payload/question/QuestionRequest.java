package com.web.backend.payload.question;

import lombok.Data;

@Data
public class QuestionRequest {
    int articleId;
    String title;
}
