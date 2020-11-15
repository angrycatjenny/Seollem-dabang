package com.web.backend.payload.answer;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@NotNull
public class AnswerReqeust {
    boolean [] answerList;
    Long examiner;
}
