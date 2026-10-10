package com.Protocol.Placement.service;

import com.Protocol.Placement.dto.job.JobRequest;
import com.Protocol.Placement.dto.job.JobResponse;
import com.Protocol.Placement.entity.Job;
import com.Protocol.Placement.mapper.JobMapper;
import com.Protocol.Placement.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;
    public JobService(JobRepository jobRepository,JobMapper jobMapper) {
        this.jobRepository = jobRepository;
        this.jobMapper=jobMapper;
    }

    // Create a new job
    public JobResponse createJob(JobRequest jobRequest) {

        Job job = jobMapper.toEntity(jobRequest);

        Job savedJob = jobRepository.save(job);

        return jobMapper.toResponse(savedJob);
    }

    // Get all jobs
    public List<JobResponse> getAllJobs() {

        return jobRepository.findAll()
                .stream()
                .map(jobMapper::toResponse)
                .toList();
    }
    // Get only active jobs
    public List<JobResponse> getActiveJobs() {

        return jobRepository.findByActiveTrue().stream().map(jobMapper::toResponse).toList();
    }

    // Get job by ID
    public JobResponse getJobById(Long id) {
        Job job=jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        return jobMapper.toResponse(job);
    }

    // Get jobs by company
    public List<JobResponse> getJobsByCompany(String company) {

        return jobRepository.findByCompanyIgnoreCase(company).stream().map(jobMapper::toResponse).toList();
    }

    // Update job
    public JobResponse updateJob(Long id, JobRequest updatedJob) {

        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setSkillsRequired(updatedJob.getSkillsRequired());
        existingJob.setDeadline(updatedJob.getDeadline());
        existingJob.setActive(updatedJob.isActive());
        Job updatedjob=jobRepository.save(existingJob);

        return jobMapper.toResponse(updatedjob);
    }

    // Close a job
    public JobResponse closeJob(Long id) {

        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));

        job.setActive(false);
        Job close=jobRepository.save(job);

        return jobMapper.toResponse(close);
    }

    // Delete job
    public void deleteJob(Long id) {

        Job job =jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));

        jobRepository.delete(job);
    }
}