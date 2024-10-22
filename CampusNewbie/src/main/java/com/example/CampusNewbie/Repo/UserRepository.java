// src/main/java/com/example/CampusNewbie/repository/UserRepository.java
package com.example.CampusNewbie.Repo;

import com.example.CampusNewbie.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
