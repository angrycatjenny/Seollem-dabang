package com.web.backend.dao.conversation;

import com.web.backend.model.Conversation.Conversation;
import com.web.backend.model.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationDao extends JpaRepository<Conversation, String> {
    Conversation getConversationByConversationId(Long conversationId);
}
