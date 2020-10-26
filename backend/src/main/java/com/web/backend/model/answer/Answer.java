package com.web.backend.model.answer;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.web.backend.model.accounts.User;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="answer_id")
    private Long answerId;

    @Column(name="correct_rate", nullable=false)
    private double correctRate;

    @ManyToOne
    @JoinColumn(name="examinee_id")
    private User examinee;

    @ManyToOne
    @JoinColumn(name="examiner_id")
    private User examiner;

    @Builder
    public Answer(double correctRate, User examinee, User examiner){
        this.correctRate = correctRate;
        this.examinee = examinee;
        this.examiner = examiner;
    }

}
