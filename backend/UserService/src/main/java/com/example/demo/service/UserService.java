package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.User;
import com.example.demo.repo.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
	@Autowired
    private UserRepository userRepository;

    // Register a new user
    public User registerUser(User user) {
        // Check if the username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new IllegalArgumentException("Username already exists");
        }
        return userRepository.save(user);
    }

    // Login a user (find by username)
    public User loginUser(String username, String password) {
        // Your login logic here, e.g., validate user credentials
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        throw new IllegalArgumentException("Invalid username or password");
    }

    // Get a user by ID
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        throw new IllegalArgumentException("User not found");
    }

    // Update user details
    @Transactional
    public User updateUser(Long userId, User updatedUser) {
        // Find the user by their ID
        Optional<User> existingUserOpt = userRepository.findById(userId);
        
        // If user exists, update their details
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            
            // Update the necessary fields
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());  // You might want to hash the password here

            // Save the updated user back to the database
            return userRepository.save(existingUser);
        } else {
            // If the user does not exist, you can throw an exception or return null
            throw new RuntimeException("User not found");
        }
    }
    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public boolean deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }
        return false;
    }
}
