package com.web.backend.controller.question;

import com.web.backend.dao.question.QuestionDao;
import com.web.backend.model.question.Question;
import com.web.backend.model.question.QuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.awt.*;
import java.util.Optional;

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
    public String update(@PathVariable int questionId){
        System.out.println(questionDao.getQuestionByQuestionId(questionId));
        return "AAAA";
    }
}
