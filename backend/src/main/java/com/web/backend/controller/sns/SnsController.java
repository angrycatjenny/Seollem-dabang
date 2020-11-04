package com.web.backend.controller.sns;

import com.web.backend.controller.conversation.SpeechToText;
import com.web.backend.controller.question.MorphologicalAnalysis;
import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.sns.SnsDao;
import com.web.backend.dao.tag.TagDao;
import com.web.backend.model.Conversation.ConversationContent;
import com.web.backend.model.Keyword.Keyword;
import com.web.backend.model.accounts.User;
import com.web.backend.model.question.Question;
import com.web.backend.model.sns.Sns;
import com.web.backend.model.tag.Tag;
import com.web.backend.payload.question.QuestionRequest;
import com.web.backend.payload.sns.SnsRequest;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import com.web.backend.service.ImageStorageService;
import com.web.backend.service.VoiceStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping(value = "/post")
public class SnsController {

    @Autowired
    SnsDao snsDao;

    @Autowired
    TagDao tagDao;

    @Autowired
    UserDao userDao;

    @Autowired
    ImageStorageService imageStorageService;

    @Autowired
    VoiceStorageService voiceStorageService;

    @PostMapping("")
    public Object create(@CurrentUser UserPrincipal requser, SnsRequest req, @RequestPart(required = false) MultipartFile image, @RequestPart(required = false) MultipartFile voice){
        User curuser = userDao.getUserById(requser.getId());
        ArrayList<String> tagList = req.getTags();

        String voiceName = voiceStorageService.storeFile(voice);
        String imageName = imageStorageService.storeFile(image);

        SpeechToText stt = new SpeechToText();
        String text = stt.recognitionSpeech("C:\\Users\\multicampus\\Desktop\\Final\\s03p31b103\\backend\\src\\main\\resources\\voice\\"+voiceName);

        Sns sns = new Sns(voiceName,imageName,text,curuser);
        snsDao.save(sns);

        //-----------------태그----------------------
//        ArrayList<Tag> tags = new ArrayList<>();
//        for(String tag:tagList){
//            if(!tagDao.existsByContent(tag)){
//                Tag newTag = new Tag(tag);
//                tagDao.save(newTag);
//            }
//            tags.add(tagDao.getTagByContent(tag));
//        }
//
//        sns.setTags(tags);
//        snsDao.save(sns);
        //-----------------태그----------------------
        return new ResponseEntity<>("게시글 등록 완료",HttpStatus.OK);
    }

    @GetMapping("")
    public Object getList(){
        ArrayList<Sns> snsList = (ArrayList<Sns>) snsDao.findAll();
        return snsList;
    }

    @PutMapping("/{snsId}")
    public Object update(@PathVariable Long snsId, @CurrentUser UserPrincipal requser, SnsRequest req, @RequestPart(required = false) MultipartFile image, @RequestPart(required = false) MultipartFile voice){
        Sns sns = snsDao.findSnsBySnsId(snsId);
        User curuser = userDao.getUserById(requser.getId());

        String voiceName = voiceStorageService.storeFile(voice);
        String imageName = imageStorageService.storeFile(image);
        SpeechToText stt = new SpeechToText();
        String text = stt.recognitionSpeech("C:\\Users\\multicampus\\Desktop\\Final\\s03p31b103\\backend\\src\\main\\resources\\voice\\"+voiceName);

        //-----------------태그----------------------
//        ArrayList<Tag> tags = new ArrayList<>();
//        for(String tag:tagList){
//            if(!tagDao.existsByContent(tag)){
//                Tag newTag = new Tag(tag);
//                tagDao.save(newTag);
//            }
//            tags.add(tagDao.getTagByContent(tag));
//        }
//        sns.setTags(tags);
        //-----------------태그----------------------

        sns.setVoice(voiceName);
        sns.setImage(imageName);
        sns.setText(text);
        snsDao.save(sns);

        return sns;
    }

    @DeleteMapping("/{snsId}")
    public Object delete(@PathVariable Long snsId){
        Sns sns = snsDao.findSnsBySnsId(snsId);
        snsDao.delete(sns);
        return new ResponseEntity<>("게시글 삭제 완료",HttpStatus.OK);
    }

}
