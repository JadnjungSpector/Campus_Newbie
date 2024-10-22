// src/main/java/com/example/CampusNewbie/controller/AuthController.java
package com.example.CampusNewbie.Controller;

import com.example.CampusNewbie.Model.User;
import com.example.CampusNewbie.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return "Login successful for user: " + user.getUsername();
        } else {
            return "Invalid username or password";
        }
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        // Save user to the database
        userRepository.save(user);
        return "User registered: " + user.getUsername();
    }
}
