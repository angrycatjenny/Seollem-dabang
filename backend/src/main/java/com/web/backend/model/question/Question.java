package com.web.backend.model.question;

import com.web.backend.model.accounts.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_id")
    private Long questionId;

    @NotBlank
    @Column(name="content", nullable=false, length=200)
    private String content;

    @Column(name="correct_answer", nullable=false)
    private Boolean correctAnswer;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;


    @Builder
    public Question(String content, Boolean correctAnswer, User user){
        this.content = content;
        this.correctAnswer = correctAnswer;
        this.user = user;
    }
}
