package com.web.backend.dao.conversation;

import com.web.backend.model.Conversation.ConversationContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationContentDao extends JpaRepository<ConversationContent, String> {
    List<ConversationContent> findConversationContentByConversation_conversationId(Long conversationId);
}
