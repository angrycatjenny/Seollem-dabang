package com.web.backend.controller.sns;

import com.web.backend.controller.conversation.SpeechToText;
import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.sns.SnsDao;
import com.web.backend.dao.tag.TagDao;
import com.web.backend.model.accounts.User;
import com.web.backend.model.sns.Sns;
import com.web.backend.payload.sns.SnsRequest;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import com.web.backend.service.ImageStorageService;
import com.web.backend.service.VoiceStorageService;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;



import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;


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

        System.out.println("Python Call");
        String[] command = new String[4];
        command[0] = "python";
        command[1] = "/Users/multicampus/Desktop/PJT/PJT3/sub2/backend/emotion_recognition/test.py";
        command[2] = "1601631973679";  //파일명

        try {
            CommandLine commandLine = CommandLine.parse(command[0]);
            for (int i = 1, n = command.length; i < n; i++) {
                commandLine.addArgument(command[i]);
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setStreamHandler(pumpStreamHandler);
            int result = executor.execute(commandLine);
            System.out.println("result: " + result);

            String output = outputStream.toString().substring(outputStream.toString().indexOf("{"));
            HashMap<String, String> emotion = new HashMap<String, String>();

            String key = "";
            String value = "";
            boolean keyFlag = false;
            boolean valueFlag = false;

            for(char w:output.toCharArray()){
                if(w==' '){
                    continue;
                }
                if(w==','){
                    emotion.put(key,value);
                    key="";
                    value="";
                    valueFlag=false;
                }

                if(keyFlag && w!='\''){
                    key+=w;
                }
                if(valueFlag){
                    value+=w;
                }

                if(w=='\''){
                    keyFlag=!keyFlag;
                    valueFlag=false;
                }
                if(w==':'){
                    valueFlag = true;
                    keyFlag=false;
                }
            }
            
            System.out.println(emotion);

            //k는 감정, emotion.get(k)는 점수가 담겨 있다.
            for(String k:emotion.keySet()){
                System.out.println(emotion.get(k));
                if(!emotion.get(k).equals("0")){
                    System.out.println("여기서 db에 넣는 코드를 작성");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }




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
