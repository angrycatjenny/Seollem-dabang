package com.web.backend.model.Conversation;

import com.web.backend.model.accounts.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="conversation_id")
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
