package com.web.backend.controller.question;

import com.web.backend.dao.question.QuestionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"})
@RestController
public class QuestionController {
    @Autowired
    QuestionDao questionDao;

    @GetMapping("/question/create")
    public String create(){
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        return "AAAA";
    }
}
