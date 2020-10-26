package com.web.backend.controller.answer;

import com.web.backend.dao.accounts.UserDao;
import com.web.backend.dao.answer.AnswerDao;
import com.web.backend.dao.question.QuestionDao;
import com.web.backend.model.accounts.User;
import com.web.backend.model.answer.Answer;
import com.web.backend.model.question.Question;
import com.web.backend.payload.answer.AnswerReqeust;
import com.web.backend.security.CurrentUser;
import com.web.backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
public class AnswerController {

    @Autowired
    UserDao userDao;

    @Autowired
    AnswerDao answerDao;

    @Autowired
    QuestionDao questionDao;

    @PostMapping("/answer")
    public Object create(@CurrentUser UserPrincipal requser, @RequestBody AnswerReqeust req){

        boolean [] answerList = req.getAnswerList();
        List<Question> questionList = questionDao.findQuestionByUserId(req.getExaminer());

        double n = questionList.toArray().length;
        int rightAnswer=0;
        for(int i=0;i<n;i++){
            if(answerList[i]==questionList.get(i).getCorrectAnswer()){
                rightAnswer++;
            }
        }
        double correctRate = rightAnswer/n;
        System.out.println();
        User examinee = userDao.getUserById(requser.getId());
        User examiner = userDao.getUserById(req.getExaminer());

        Answer answer = new Answer(correctRate,examinee, examiner);
        answerDao.save(answer);
        return new ResponseEntity<>("답변 등록 완료", HttpStatus.OK);
    }

    @GetMapping("/answer/list")
    public Object getList(@CurrentUser UserPrincipal requser){
        List<Answer> answerList = answerDao.getAnswerByExamineeId(requser.getId());
        return answerList;
    }

}
