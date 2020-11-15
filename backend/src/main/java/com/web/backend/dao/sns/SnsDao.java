package com.web.backend.dao.sns;

import com.web.backend.model.sns.Sns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SnsDao extends JpaRepository<Sns,String> {
    Sns findSnsBySnsId(Long snsId);

}
