package com.web.backend.controller.question;

import com.web.backend.dao.question.QuestionDao;
import com.web.backend.model.question.Question;
import com.web.backend.payload.question.QuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping(value = "/question")
public class QuestionController {
    @Autowired
    QuestionDao questionDao;

    @PostMapping("/create")
    public Object create(@Valid @RequestBody QuestionRequest req){
        Question question = new Question(req.getContent(),req.getAnswer());
        questionDao.save(question);
        return new ResponseEntity<>("게시글 등록 완료",HttpStatus.OK);
    }

    @GetMapping("/list/{userId}")
    public Object getList(@PathVariable int userId){
        Question question = questionDao.findQuestionByUserId(userId);
        return question;
    }

    @PutMapping("/update/{questionId}")
    public Object update(@Valid @RequestBody QuestionRequest req, @PathVariable int questionId){
        Question question = questionDao.getQuestionByQuestionId(questionId);
        question.setContent(req.getContent());
        question.setAnswer(req.getAnswer());
        questionDao.save(question);
        return question;
    }

    @DeleteMapping("/delete/{questionId}")
    public Object delete(@PathVariable int questionId){
        Question question = questionDao.getQuestionByQuestionId(questionId);
        questionDao.delete(question);
        return new ResponseEntity<>("게시글 삭제 완료",HttpStatus.OK);
    }
}
