package com.web.backend.dao.question;

import com.web.backend.model.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface QuestionDao extends JpaRepository<Question, String> {
    Question getQuestionByQuestionId(Long questionId);
    ArrayList<Question> findQuestionByUserId(Long userId);
    Boolean existsByUserId(Long userId);
}
