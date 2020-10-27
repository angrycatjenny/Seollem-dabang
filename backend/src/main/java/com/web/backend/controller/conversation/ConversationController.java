package com.web.backend.controller.conversation;

import com.web.backend.payload.answer.AnswerReqeust;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"*"})
@RestController
public class ConversationController {

//    @PostMapping("/answer")
//    public Object create(@CurrentUser UserPrincipal requser, @RequestBody AnswerReqeust req) {
//        String imageName = imageStorageService.storeFile(image);
//        String voiceName = voiceStorageService.storeFile(voice);
//    }
}
