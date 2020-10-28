package com.web.backend.dao.keyword;

import com.web.backend.model.Keyword.Keyword;
import com.web.backend.model.accounts.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface KeywordDao extends JpaRepository<Keyword,String> {
    List<Keyword> findKeywordByQuestion_questionId(Long question_id);
    List<Keyword> findKeywordByUser(User user);
    boolean existsByWordAndUserId(String word, Long user_id);
}
