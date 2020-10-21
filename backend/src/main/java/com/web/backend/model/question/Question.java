package com.web.backend.model.question;

import javax.persistence.*;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_id")
    private int questionId;

    @Column(name="title")
    private String title;

    public Question(int questionId, String title){
        this.questionId=questionId;
        this.title = title;
    }
}
