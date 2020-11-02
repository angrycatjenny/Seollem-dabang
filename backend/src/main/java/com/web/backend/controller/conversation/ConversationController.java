package com.web.backend.controller.conversation;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.conversation.ConversationDao;
import com.web.backend.dao.question.QuestionDao;
import com.web.backend.model.Conversation.Conversation;
import com.web.backend.model.accounts.User;
import com.web.backend.model.question.Question;
import com.web.backend.payload.conversation.ConversationRequest;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = {"*"})
@RestController
public class ConversationController {

    @Autowired
    UserDao userDao;

    @Autowired
    QuestionDao questionDao;

    @Autowired
    ConversationDao conversationDao;
    
    @PostMapping("/conversation")
    public Object create(@CurrentUser UserPrincipal requser, @RequestBody ConversationRequest req) {
        User examinee = userDao.getUserById(requser.getId());
        User examiner = userDao.getUserById(req.getExaminer());

        Conversation conversation = new Conversation(examinee,examiner);
        conversationDao.save(conversation);
        return conversation.getConversationId();
    }

    @GetMapping("/conversation/list")
    public Object getList(@CurrentUser UserPrincipal requser){
        ArrayList<Conversation> conversationList = conversationDao.getConversationByExaminerId(requser.getId());
        conversationList.addAll(conversationDao.getConversationByExamineeId(requser.getId()));
        return conversationList;
    }
}
