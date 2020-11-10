package com.web.backend.dao.tag;

import com.web.backend.model.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TagDao extends JpaRepository<Tag,String> {
    Boolean existsByContent(String content);
    Tag getTagByContent(String contet);
    ArrayList<Tag> getTagBySns_SnsId(Long snsId);
}
