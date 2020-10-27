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
public class ConversationContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conversationContentId;

    @Column(name="voice")
    private String voice;

    @ManyToOne
    @JoinColumn(name="conversation_id")
    private Conversation conversation;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Builder
    public ConversationContent(String voice,Conversation conversation,User user){
        this.voice=voice;
        this.conversation = conversation;
        this.user = user;
    }
}
