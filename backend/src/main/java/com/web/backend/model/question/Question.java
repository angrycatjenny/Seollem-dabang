package com.web.backend.model.question;

import com.web.backend.model.accounts.User;
import com.web.backend.security.UserPrincipal;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Optional;

@Entity
@NoArgsConstructor
@Getter
@Setter
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
    @JoinColumn(name="user_id")
    private User user;


    @Builder
    public Question(String content, Boolean answer, User user){
        this.content = content;
        this.answer = answer;
        this.user = user;
    }
}
