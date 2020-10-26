package com.web.backend.dao.question;

import com.web.backend.model.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question, String> {
    Question getQuestionByQuestionId(int questionId);
    List<Question> findQuestionByUserId(Long userId);
}
