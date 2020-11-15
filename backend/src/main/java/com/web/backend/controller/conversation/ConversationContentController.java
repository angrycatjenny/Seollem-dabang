package com.web.backend.controller.conversation;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.conversation.ConversationContentDao;
import com.web.backend.dao.conversation.ConversationDao;
import com.web.backend.model.Conversation.Conversation;
import com.web.backend.model.Conversation.ConversationContent;
import com.web.backend.model.accounts.User;
import com.web.backend.payload.conversation.ConversationContentRequest;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import com.web.backend.service.VoiceStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping(value="/api")
@CrossOrigin(origins = {"*"})
@RestController
public class ConversationContentController {

    @Autowired
    VoiceStorageService voiceStorageService;

    @Autowired
    ConversationContentDao conversationContentDao;

    @Autowired
    ConversationDao conversationDao;

    @Autowired
    UserDao userDao;

    @PostMapping("/conversation/create/{conversationId}")
    public Object create(@CurrentUser UserPrincipal requser,@PathVariable Long conversationId, @RequestPart(required = false) MultipartFile voice) throws Exception {
        User curuser = userDao.getUserById(requser.getId());
        Conversation conversation=conversationDao.getConversationByConversationId(conversationId);

        String voiceName = voiceStorageService.storeFile(voice);
        SpeechToText stt = new SpeechToText();
        String text = stt.recognitionSpeech("/var/lib/jenkins/workspace/jenkins-test/backend/src/main/resources/api/voice/"+voiceName);
        ConversationContent cc = new ConversationContent(voiceName,conversation,curuser,text);
        conversationContentDao.save(cc);


        return new ResponseEntity<>("대화 생성 완료", HttpStatus.OK);
    }
    
    @PostMapping("/conversation/propose/{conversationId}")
    public Object propose(@CurrentUser UserPrincipal requser,@PathVariable Long conversationId) throws Exception {
        User curuser = userDao.getUserById(requser.getId());
        Conversation conversation=conversationDao.getConversationByConversationId(conversationId);

        String voiceName = "화상채팅 신청";
        String text = "화상채팅 신청";
        ConversationContent cc = new ConversationContent(voiceName,conversation,curuser,text);
        conversationContentDao.save(cc);

        return new ResponseEntity<>("화상채팅 신청 완료", HttpStatus.OK);
    }

    @GetMapping("/conversation/list/{conversationId}")
    public Object getList(@PathVariable Long conversationId){
        List<ConversationContent> conversationContentList = conversationContentDao.findConversationContentByConversation_conversationId(conversationId);
        return conversationContentList;
    }
}
