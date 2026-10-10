package com.Protocol.Placement.service;

import com.Protocol.Placement.entity.User;
import com.Protocol.Placement.enums.Role;
import com.Protocol.Placement.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register user
    public User createUser(User user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        if (user.getRole() == null) {
            user.setRole(Role.ROLE_STUDENT);
        }

        return userRepository.save(user);
    }

    // Get user by username
    public User getByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    // Get user by ID
    public User getById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    // Get all users
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // Delete user
    public void deleteUser(Long id) {

        User user = getById(id);

        userRepository.delete(user);
    }

    // Update role
    public User updateRole(Long id, Role role) {

        User user = getById(id);

        user.setRole(role);

        return userRepository.save(user);
    }
}