package com.web.backend.payload.question;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@NotNull
public class QuestionRequest {
    String content;
    Boolean correctAnswer;
}
