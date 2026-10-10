package com.Protocol.Placement.controller;

import com.Protocol.Placement.dto.student.StudentProfileResponse;
import com.Protocol.Placement.entity.StudentProfile;
import com.Protocol.Placement.service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/student-profiles")
@CrossOrigin
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    public StudentProfileController(
            StudentProfileService studentProfileService) {

        this.studentProfileService = studentProfileService;
    }

    @PostMapping(
            value = "/user/{userId}",
            consumes = "multipart/form-data"
    )
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentProfileResponse> createProfile(
            @PathVariable Long userId,
            @RequestPart("profile") StudentProfile profile,
            @RequestPart("profilePicture") MultipartFile profilePicture) {

        return ResponseEntity.ok(
                studentProfileService.createProfile(
                        userId,
                        profile,
                        profilePicture
                )
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<StudentProfileResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentProfileService.getById(id)
        );
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<StudentProfileResponse> getByUserId(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                studentProfileService.getByUserId(userId)
        );
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<StudentProfileResponse>> getAllProfiles() {

        return ResponseEntity.ok(
                studentProfileService.getAllProfiles()
        );
    }

    @PutMapping(
            value = "/user/{userId}",
            consumes = "multipart/form-data"
    )
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<StudentProfileResponse> updateProfile(

            @PathVariable Long userId,

            @RequestPart("profile")
            StudentProfile profile,

            @RequestPart(value = "profilePicture", required = false)
            MultipartFile profilePicture) {

        return ResponseEntity.ok(
                studentProfileService.updateProfile(
                        userId,
                        profile,
                        profilePicture
                )
        );
    }
    // =========================
// ADD SKILL TO STUDENT
// =========================

    @PostMapping("/user/{userId}/skills/{skillId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentProfileResponse> addSkill(
            @PathVariable Long userId,
            @PathVariable Long skillId) {

        return ResponseEntity.ok(
                studentProfileService.addSkill(
                        userId,
                        skillId
                )
        );
    }
    //remove skill to student
    @DeleteMapping("/user/{userId}/skills/{skillId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentProfileResponse> removeSkill(
            @PathVariable Long userId,
            @PathVariable Long skillId) {

        return ResponseEntity.ok(
                studentProfileService.removeSkill(
                        userId,
                        skillId
                )
        );
    }

    @DeleteMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<String> deleteProfile(
            @PathVariable Long userId) {

        studentProfileService.deleteProfile(userId);

        return ResponseEntity.ok(
                "Student profile deleted successfully"
        );
    }
}