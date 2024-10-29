// // src/main/java/com/example/CampusNewbie/controller/AuthController.java
// package com.example.CampusNewbie.Controller;

// import com.example.CampusNewbie.Model.User;
// import com.example.CampusNewbie.Repo.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.regex.Pattern;

// @CrossOrigin(origins = "http://localhost:3000")
// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired
//     private UserRepository userRepository;

//     private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

//     @PostMapping("/login")
//     public ResponseEntity<String> login(@RequestBody User user) {
//         User foundUser = userRepository.findByUsername(user.getUsername());
//         if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
//             return ResponseEntity.ok("Login successful for user: " + user.getUsername());
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//         }
//     }

//     @PostMapping("/register")
//     public ResponseEntity<String> register(@RequestBody User user) {
//         // Validate user data
//         if (!user.isValid()) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required.");
//         }

//         // Check if the username already exists
//         if (userRepository.findByUsername(user.getUsername()) != null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken.");
//         }

//         // Validate email format
//         if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email format.");
//         }

//         // Save user to the database without hashing the password
//         userRepository.save(user);
//         return ResponseEntity.status(HttpStatus.CREATED).body("User registered: " + user.getUsername());
//     }
// }
package com.example.CampusNewbie.Controller;

import com.example.CampusNewbie.Model.User;
import com.example.CampusNewbie.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.regex.Pattern;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Login successful for user: " + user.getUsername());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        logger.info("Received registration request: {}", user);

        // Validate user data
        if (!user.isValid()) {
            logger.error("Validation failed: All fields are required.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required.");
        }

        // Check if the username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            logger.error("Validation failed: Username is already taken.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken.");
        }

        // Validate email format
        if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
            logger.error("Validation failed: Invalid email format.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email format.");
        }

        // Save user to the database
        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered: " + user.getUsername());
    }
}
