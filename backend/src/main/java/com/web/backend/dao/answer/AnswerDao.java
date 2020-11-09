package com.web.backend.dao.answer;

import com.web.backend.model.accounts.User;
import com.web.backend.model.answer.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerDao extends JpaRepository<Answer, String> {
    List<Answer> getAnswerByExamineeId(Long examinee_id);
    List<Answer> findAnswerByExaminerId(Long examiner_id);
    @Query(value = "SELECT a.examiner_id FROM answer a where a.examinee_id = :examinee_id",nativeQuery = true)
    List<Long> findexaminerIdByexamineeId(@Param("examinee_id") Long examinee_id);
}
