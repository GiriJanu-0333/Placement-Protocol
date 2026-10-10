package com.Protocol.Placement.controller;

import com.Protocol.Placement.dto.application.ApplicationResponse;
import com.Protocol.Placement.dto.job.JobRequest;
import com.Protocol.Placement.dto.job.JobResponse;
import com.Protocol.Placement.entity.Application;
import com.Protocol.Placement.entity.Job;
import com.Protocol.Placement.entity.Skill;
import com.Protocol.Placement.entity.User;
import com.Protocol.Placement.enums.ApplicationStatus;
import com.Protocol.Placement.enums.Role;
import com.Protocol.Placement.service.ApplicationService;
import com.Protocol.Placement.service.JobService;
import com.Protocol.Placement.service.SkillService;
import com.Protocol.Placement.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final JobService jobService;
    private final SkillService skillService;
    private final ApplicationService applicationService;

    public AdminController(
            UserService userService,
            JobService jobService,
            SkillService skillService,
            ApplicationService applicationService) {

        this.userService = userService;
        this.jobService = jobService;
        this.skillService = skillService;
        this.applicationService = applicationService;
    }

    // =========================
    // USERS
    // =========================

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getById(id)
        );
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRole(
            @PathVariable Long id,
            @RequestParam Role role) {

        return ResponseEntity.ok(
                userService.updateRole(id, role)
        );
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }

    // =========================
    // JOBS
    // =========================

    @PostMapping("/jobs")
    public ResponseEntity<JobResponse> createJob(
            @RequestBody JobRequest job) {

        return ResponseEntity.ok(
                jobService.createJob(job)
        );
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable Long id,
            @RequestBody JobRequest job) {

        return ResponseEntity.ok(
                jobService.updateJob(id, job)
        );
    }

    @PutMapping("/jobs/{id}/close")
    public ResponseEntity<JobResponse> closeJob(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobService.closeJob(id)
        );
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok(
                "Job deleted successfully"
        );
    }

    // =========================
    // SKILLS
    // =========================

    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(
            @RequestBody Skill skill) {

        return ResponseEntity.ok(
                skillService.createSkill(skill)
        );
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skill) {

        return ResponseEntity.ok(
                skillService.updateSkill(id, skill)
        );
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<String> deleteSkill(
            @PathVariable Long id) {

        skillService.deleteSkill(id);

        return ResponseEntity.ok(
                "Skill deleted successfully"
        );
    }

    // =========================
    // APPLICATIONS
    // =========================

    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {

        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }

    @GetMapping("/applications/{id}")
    public ResponseEntity<ApplicationResponse> getApplication(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                applicationService.getApplicationById(id)
        );
    }

    @GetMapping("/applications/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsForJob(jobId)
        );
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status) {

        return ResponseEntity.ok(
                applicationService.updateStatus(
                        id,
                        status
                )
        );
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<String> deleteApplication(
            @PathVariable Long id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.ok(
                "Application deleted successfully"
        );
    }
}