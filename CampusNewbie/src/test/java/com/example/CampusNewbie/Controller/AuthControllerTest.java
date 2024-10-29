package com.example.CampusNewbie.Controller;

import com.example.CampusNewbie.Model.User;
import com.example.CampusNewbie.Repo.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test // Ensuring that a user can log in
    public void testRegisterSuccess() {
        User user = new User("awesomeSauce", "testpass", "test@example.com");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);

        ResponseEntity<String> response = authController.register(user);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("User registered: awesomeSauce", response.getBody());
    }

    @Test // Ensuring that user names must be unique
    public void testRegisterUsernameTaken() {
        User user = new User("testuser", "testpass", "test@example.com");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);

        ResponseEntity<String> response = authController.register(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Username is already taken.", response.getBody());
    }

    @Test // Ensuring that emails have to be valid
    public void testRegisterInvalidEmail() {
        User user = new User("testuser", "testpass", "invalid-email");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);

        ResponseEntity<String> response = authController.register(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid email format.", response.getBody());
    }
}
