package com.web.backend.dao.emotion;

import com.web.backend.model.emotion.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmotionDao extends JpaRepository<Emotion, String> {

}
