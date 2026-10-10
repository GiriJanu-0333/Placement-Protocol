package com.Protocol.Placement.controller;

import com.Protocol.Placement.dto.application.ApplicationResponse;
import com.Protocol.Placement.entity.Application;
import com.Protocol.Placement.enums.ApplicationStatus;
import com.Protocol.Placement.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    @PostMapping("/apply")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApplicationResponse> applyForJob(
            @RequestParam Long studentId,
            @RequestParam Long jobId) {

        return ResponseEntity.ok(
                applicationService.applyForJob(
                        studentId,
                        jobId
                )
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ApplicationResponse> getApplicationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                applicationService.getApplicationById(id)
        );
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                applicationService.getMyApplications(studentId)
        );
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsForJob(jobId)
        );
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {

        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status) {

        return ResponseEntity.ok(
                applicationService.updateStatus(
                        id,
                        status
                )
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteApplication(
            @PathVariable Long id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.ok(
                "Application deleted successfully"
        );
    }
}