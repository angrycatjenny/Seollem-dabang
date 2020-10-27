package com.web.backend.controller.question;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.answer.AnswerDao;
import com.web.backend.dao.keyword.KeywordDao;
import com.web.backend.dao.question.QuestionDao;
import com.web.backend.model.Keyword.Keyword;
import com.web.backend.model.accounts.User;
import com.web.backend.model.question.Question;
import com.web.backend.payload.question.QuestionListRequest;
import com.web.backend.payload.question.QuestionRequest;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping(value = "/question")
public class QuestionController {

    @Autowired
    UserDao userDao;

    @Autowired
    QuestionDao questionDao;

    @Autowired
    AnswerDao answerDao;

    @Autowired
    KeywordDao keywordDao;


    @PostMapping("/create")
    public Object create(@CurrentUser UserPrincipal requser, @RequestBody QuestionListRequest req){
        User curuser = userDao.getUserById(requser.getId());
        String [] contentList = req.getContentList();
        Boolean[] correctAnswerList = req.getCorrectAnswerList();

        MorphologicalAnalysis ma = new MorphologicalAnalysis();
        for(int i=0;i<contentList.length;i++){
            Question question = new Question(contentList[i],correctAnswerList[i], curuser);
            questionDao.save(question);
            ArrayList<String> words = ma.MorAnalysis(contentList[i]);
            for(String word:words){
                Keyword keyword = new Keyword(word,question,curuser);
                keywordDao.save(keyword);
            }
        }

        return new ResponseEntity<>("게시글 등록 완료",HttpStatus.OK);
    }

    @GetMapping("/list/{userId}")
    public Object getList(@PathVariable Long userId){
        List<Question> questionList = questionDao.findQuestionByUserId(userId);
        return questionList;
    }

    @PutMapping("/update/{questionId}")
    public Object update(@Valid @RequestBody QuestionRequest req, @PathVariable Long questionId){
        Question question = questionDao.getQuestionByQuestionId(questionId);
        User curuser = userDao.getUserById(question.getUser().getId());

        answerDao.deleteAll(answerDao.findAnswerByExaminerId(question.getUser().getId()));
        keywordDao.deleteAll(keywordDao.findKeywordByQuestion_questionId(questionId));

        MorphologicalAnalysis ma = new MorphologicalAnalysis();
        ArrayList<String> words = ma.MorAnalysis(req.getContent());

        for(String word:words){
            Keyword keyword = new Keyword(word,question,curuser);
            keywordDao.save(keyword);
        }

        question.setContent(req.getContent());
        question.setCorrectAnswer(req.getCorrectAnswer());
        questionDao.save(question);
        return question;
    }

    @DeleteMapping("/delete/{questionId}")
    public Object delete(@PathVariable Long questionId){
        Question question = questionDao.getQuestionByQuestionId(questionId);
        answerDao.deleteAll(answerDao.findAnswerByExaminerId(question.getUser().getId()));
        keywordDao.deleteAll(keywordDao.findKeywordByQuestion_questionId(questionId));
        questionDao.delete(question);
        return new ResponseEntity<>("게시글 삭제 완료",HttpStatus.OK);
    }
}
