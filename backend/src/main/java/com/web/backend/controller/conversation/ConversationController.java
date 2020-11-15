package com.web.backend.controller.conversation;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.conversation.ConversationDao;
import com.web.backend.dao.emotion.EmotionDao;
import com.web.backend.model.Conversation.Conversation;
import com.web.backend.model.Conversation.ConversationContent;
import com.web.backend.model.accounts.User;
import com.web.backend.model.emotion.Emotion;
import com.web.backend.payload.conversation.ConversationRequest;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import com.web.backend.service.VideoStorageService;
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
import java.util.HashMap;

@RequestMapping(value="/api")
@CrossOrigin(origins = {"*"})
@RestController
public class ConversationController {

    @Autowired
    UserDao userDao;

    @Autowired
    ConversationDao conversationDao;

    @Autowired
    EmotionDao emotionDao;

    @Autowired
    VideoStorageService videoStorageService;

    @PostMapping("/conversation")
    public Object create(@CurrentUser UserPrincipal requser, @RequestBody ConversationRequest req) {
        User examinee = userDao.getUserById(requser.getId());
        User examiner = userDao.getUserById(req.getExaminer());

        Conversation conversation = new Conversation(examinee, examiner);
        conversationDao.save(conversation);
        return conversation.getConversationId();
    }

    @GetMapping("/conversation/list")
    public Object getList(@CurrentUser UserPrincipal requser) {
        ArrayList<Conversation> conversationList = conversationDao.getConversationByExaminerId(requser.getId());
        conversationList.addAll(conversationDao.getConversationByExamineeId(requser.getId()));
        return conversationList;
    }


    @PostMapping("/conversation/end/{conversationId}")
    public Object endConversation(@CurrentUser UserPrincipal requser, @RequestPart(required = false) MultipartFile video, @PathVariable Long conversationId){

        String videoName = videoStorageService.storeFile(video);
        HashMap<String,String>emotionResult = new HashMap<>();

        System.out.println("Python Call");
        String[] command = new String[3];
        command[0] = "python";
        command[1] = "/var/lib/jenkins/workspace/jenkins-test/backend/emotion_recognition/emotion_detection.py";
        command[2] = videoName;

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
            HashMap<String, String> emotionMao = new HashMap<String, String>();

            String key = "";
            String value = "";
            boolean keyFlag = false;
            boolean valueFlag = false;

            for(char w:output.toCharArray()){
                if(w==' '){
                    continue;
                }
                if(w==','){
                    emotionMao.put(key,value);
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
            emotionResult=emotionMao;
            HashMap<String, String> emotionData = new HashMap<String, String>();
            for(String k:emotionMao.keySet()){
                if(!emotionMao.get(k).equals("0")){
                    int r = Integer.parseInt(emotionMao.get(k));
                    Emotion emotion = new Emotion(userDao.getUserById(requser.getId()),conversationDao.getConversationByConversationId(conversationId),k,r);
                    emotionDao.save(emotion);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return emotionResult;
    }
}
