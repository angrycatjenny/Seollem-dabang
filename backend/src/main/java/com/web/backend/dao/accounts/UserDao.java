package com.web.backend.dao.accounts;

import com.web.backend.model.accounts.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    Optional<User> findByUserEmail(String userEmail);

    List<User> findByUserIdIn(List<Long> userIds);

    Boolean existsByUserEmail(String userEmail);

    Boolean existsByUserNickname(String userNickname);
}
