package com.web.backend.model.Conversation;

import com.web.backend.model.accounts.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conversationId;

    @ManyToOne
    @JoinColumn(name="examinee_id")
    private User examinee;

    @ManyToOne
    @JoinColumn(name="examiner_id")
    private User examiner;

    @Builder
    public Conversation(User examinee, User examiner){
        this.examinee = examinee;
        this.examiner = examiner;
    }
}
