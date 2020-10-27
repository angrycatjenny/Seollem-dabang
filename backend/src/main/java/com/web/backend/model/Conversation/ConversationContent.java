package com.web.backend.model.Conversation;

import com.web.backend.model.accounts.User;
import lombok.Builder;

import javax.persistence.*;

public class ConversationContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="conversation_content_id")
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
    public ConversationContent(Conversation conversation,User user){
        this.conversation = conversation;
        this.user = user;
    }
}
