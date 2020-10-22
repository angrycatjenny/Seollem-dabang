package com.web.backend.model.question;

import com.web.backend.model.accounts.User;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
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


    @Builder
    public Question(String content, Boolean answer){
        this.content = content;
        this.answer = answer;
    }
}
