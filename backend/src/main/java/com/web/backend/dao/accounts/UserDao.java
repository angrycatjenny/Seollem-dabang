package com.web.backend.dao.accounts;

import com.web.backend.model.accounts.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    User getUserById(Long id);

    Optional<User> findByEmail(String email);

    List<User> findByIdIn(List<Long> ids);

    Boolean existsByEmail(String email);

    Boolean existsByNickname(String nickname);

    List<User> getUserByAgeAndGenderAndLocation(int age, int gender, String Location);

}
