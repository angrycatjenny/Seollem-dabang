package com.web.backend.model.Keyword;

import com.web.backend.model.accounts.User;
import com.web.backend.model.question.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="keyword_id")
    private Long keywordId;

    @NotBlank
    @Column(name="word", nullable=false, length=20)
    private String word;

    @ManyToOne
    @JoinColumn(name="question_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Question question;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Builder
    public Keyword(String word, Question question, User user){
        this.word=word;
        this.question=question;
        this.user=user;
    }
}
