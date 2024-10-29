package com.example.CampusNewbie.Model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserTest {

    @Test // Ensuring that the fields gotta be correct
    public void testIsValid() {
        User validUser = new User("testuser", "testpass", "test@example.com");
        assertTrue(validUser.isValid());

        User invalidUser = new User("", "testpass", "test@example.com");
        assertFalse(invalidUser.isValid());

        User invalidEmailUser = new User("testuser", "testpass", "");
        assertFalse(invalidEmailUser.isValid());
    }
}
