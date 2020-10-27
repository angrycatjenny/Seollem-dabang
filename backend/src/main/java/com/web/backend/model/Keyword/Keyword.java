package com.web.backend.model.Keyword;

import com.web.backend.model.accounts.User;
import com.web.backend.model.question.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Column(name="keyword", nullable=false, length=200)
    private String keyword;

    @ManyToOne
    @JoinColumn(name="question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Builder
    public Keyword(String keyword, Question question, User user){
        this.keyword=keyword;
        this.question=question;
        this.user=user;
    }
}
