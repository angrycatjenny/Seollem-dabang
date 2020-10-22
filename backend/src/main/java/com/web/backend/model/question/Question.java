package com.web.backend.model.question;

import com.web.backend.model.accounts.User;

import javax.persistence.*;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_id")
    private int questionId;

    @Column(name="content", nullable=false, length=200)
    private String content;

    @Column(name="answer", nullable=false)
    private Boolean answer;

    @ManyToOne
    @JoinColumn(name ="user_id")
    private User user;



    public Question(int questionId, String title, Boolean answer){
        this.questionId=questionId;
        this.content = title;
        this.answer=answer;
    }
}
