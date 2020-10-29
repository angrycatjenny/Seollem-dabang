package com.web.backend.dao.keyword;

import com.web.backend.model.Keyword.Keyword;
import com.web.backend.model.accounts.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordDao extends JpaRepository<Keyword,String> {
    List<Keyword> findKeywordByQuestion_questionId(Long question_id);
    List<Keyword> findKeywordByUser(User user);
    boolean existsByWordAndUserId(String word, Long user_id);
    @Query(value = "SELECT k.word FROM keyword k where k.user_id = :user_id",nativeQuery = true)
    List<String> findWordByUserId(@Param("user_id") Long user_id);
}
