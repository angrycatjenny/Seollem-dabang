package com.web.backend.dao.keyword;

import com.web.backend.model.Keyword.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordDao extends JpaRepository<Keyword,String> {
    List<Keyword> findKeywordByQuestion_questionId(Long question_id);
}
