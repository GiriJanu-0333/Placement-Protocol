package com.Protocol.Placement.controller;

import com.Protocol.Placement.dto.job.JobRequest;
import com.Protocol.Placement.dto.job.JobResponse;
import com.Protocol.Placement.entity.Job;
import com.Protocol.Placement.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobResponse> createJob(
            @RequestBody JobRequest job) {

        return ResponseEntity.ok(
                jobService.createJob(job)
        );
    }

    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {

        return ResponseEntity.ok(
                jobService.getAllJobs()
        );
    }

    @GetMapping("/active")
    public ResponseEntity<List<JobResponse>> getActiveJobs() {

        return ResponseEntity.ok(
                jobService.getActiveJobs()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobService.getJobById(id)
        );
    }

    @GetMapping("/company/{company}")
    public ResponseEntity<List<JobResponse>> getJobsByCompany(
            @PathVariable String company) {

        return ResponseEntity.ok(
                jobService.getJobsByCompany(company)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable Long id,
            @RequestBody JobRequest job) {

        return ResponseEntity.ok(
                jobService.updateJob(id, job)
        );
    }

    @PutMapping("/{id}/close")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobResponse> closeJob(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobService.closeJob(id)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok("Job deleted successfully");
    }
}