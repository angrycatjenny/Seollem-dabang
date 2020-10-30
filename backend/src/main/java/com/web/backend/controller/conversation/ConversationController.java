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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
        Question question = questionDao.getQuestionByQuestionId(req.getQuestionId());
        User examiner = question.getUser();

        Conversation conversation = new Conversation(examinee,examiner);
        conversationDao.save(conversation);
        return new ResponseEntity<>("대화창 생성 완료", HttpStatus.OK);
    }
}
