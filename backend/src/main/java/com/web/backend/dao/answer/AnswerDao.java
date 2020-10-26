package com.web.backend.dao.answer;

import com.web.backend.model.accounts.User;
import com.web.backend.model.answer.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerDao extends JpaRepository<Answer, String> {
    List<Answer> getAnswerByExamineeId(Long examinee_id);
}
