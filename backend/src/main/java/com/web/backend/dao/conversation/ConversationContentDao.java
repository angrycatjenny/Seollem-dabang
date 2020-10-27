package com.web.backend.dao.conversation;

import com.web.backend.model.Conversation.ConversationContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationContentDao extends JpaRepository<ConversationContent, String> {

}
