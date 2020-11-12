package com.web.backend.model.emotion;

import com.web.backend.model.Conversation.Conversation;
import com.web.backend.model.accounts.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Emotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emotionId;

    @Column(name="emotion", nullable=false, length=20)
    private String emotion;

    @Column(name="rate", nullable = false)
    private int rate;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="conversation_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Conversation conversation;

    @Builder
    public Emotion(User user, Conversation conversation, String emotion, int rate){
        this.user = user;
        this.conversation = conversation;
        this.emotion = emotion;
        this.rate = rate;
    }
}
