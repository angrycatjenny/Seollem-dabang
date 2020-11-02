package com.web.backend.dao.conversation;

import com.web.backend.model.Conversation.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ConversationDao extends JpaRepository<Conversation, String> {
    Conversation getConversationByConversationId(Long conversationId);
    ArrayList<Conversation> getConversationByExaminerId(Long examinerId);
    ArrayList<Conversation> getConversationByExamineeId(Long examineeId);
}
