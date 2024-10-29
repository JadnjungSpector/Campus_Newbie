package com.example.CampusNewbie.Repo;

import com.example.CampusNewbie.Model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void setUp() {
        user = new User("testuser", "testpass", "test@example.com");
        userRepository.save(user);
    }

    @AfterEach
    public void tearDown() {
        userRepository.deleteAll();
    }

    @Test // Basic test for correctly finding a made user
    public void testFindByUsername() {
        Optional<User> foundUser = Optional.ofNullable(userRepository.findByUsername("testuser"));
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());
    }

    @Test // Ensuring that the users info is correctly saved
    public void testSaveUser() {
        User newUser = new User("newuser", "newpass", "new@example.com");
        userRepository.save(newUser);

        Optional<User> foundUser = Optional.ofNullable(userRepository.findByUsername("newuser"));
        assertTrue(foundUser.isPresent());
        assertEquals("newuser", foundUser.get().getUsername());
    }

    @Test // Ensuring that we can delete a users information
    public void testDeleteUser() {
        userRepository.delete(user);

        Optional<User> foundUser = Optional.ofNullable(userRepository.findByUsername("testuser"));
        assertFalse(foundUser.isPresent());
    }
}
