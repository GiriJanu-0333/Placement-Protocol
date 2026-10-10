package com.Protocol.Placement.controller;

import com.Protocol.Placement.entity.User;
import com.Protocol.Placement.enums.ApplicationStatus;
import com.Protocol.Placement.enums.Role;
import com.Protocol.Placement.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> getByUsername(
            @PathVariable String username) {

        return ResponseEntity.ok(
                userService.getByUsername(username)
        );
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateRole(
            @PathVariable Long id,
            @RequestParam Role role) {

        return ResponseEntity.ok(
                userService.updateRole(id, role)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }
}