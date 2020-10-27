package com.web.backend.dao.onversation;

import com.web.backend.model.Conversation.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationDao extends JpaRepository<Conversation, String> {

}
