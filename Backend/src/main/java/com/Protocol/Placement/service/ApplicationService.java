package com.Protocol.Placement.service;

import com.Protocol.Placement.dto.application.ApplicationResponse;
import com.Protocol.Placement.entity.Application;
import com.Protocol.Placement.entity.Job;
import com.Protocol.Placement.entity.User;
import com.Protocol.Placement.enums.ApplicationStatus;
import com.Protocol.Placement.mapper.ApplicationMapper;
import com.Protocol.Placement.repository.ApplicationRepository;
import com.Protocol.Placement.repository.JobRepository;
import com.Protocol.Placement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationMapper applicationMapper;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository,
            ApplicationMapper applicationMapper) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationMapper = applicationMapper;
    }

    // Apply for a job
    public ApplicationResponse applyForJob(Long studentId, Long jobId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.isActive()) {
            throw new RuntimeException("Job is no longer active");
        }

        if (applicationRepository.existsByStudentIdAndJobId(studentId, jobId)) {
            throw new RuntimeException("Already applied for this job");
        }

        Application application = new Application();

        application.setStudent(student);
        application.setJob(job);
        application.setAppliedDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.APPLIED);

        Application savedApplication = applicationRepository.save(application);

        return applicationMapper.toResponse(savedApplication);
    }

    // Get application by ID
    public ApplicationResponse getApplicationById(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        return applicationMapper.toResponse(application);
    }

    // Get student's applications
    public List<ApplicationResponse> getMyApplications(Long studentId) {

        if (!userRepository.existsById(studentId)) {
            throw new RuntimeException("Student not found");
        }

        return applicationRepository
                .findByStudentIdOrderByAppliedDateDesc(studentId)
                .stream()
                .map(applicationMapper::toResponse)
                .toList();
    }

    // Get applications for a job
    public List<ApplicationResponse> getApplicationsForJob(Long jobId) {

        if (!jobRepository.existsById(jobId)) {
            throw new RuntimeException("Job not found");
        }

        return applicationRepository
                .findByJobId(jobId)
                .stream()
                .map(applicationMapper::toResponse)
                .toList();
    }

    // Get all applications
    public List<ApplicationResponse> getAllApplications() {

        return applicationRepository
                .findAllByOrderByAppliedDateDesc()
                .stream()
                .map(applicationMapper::toResponse)
                .toList();
    }

    // Update application status
    public ApplicationResponse updateStatus(
            Long id,
            ApplicationStatus status) {

        Application application = getApplicationEntityById(id);

        application.setStatus(status);

        Application updatedApplication =
                applicationRepository.save(application);

        return applicationMapper.toResponse(updatedApplication);
    }

    // Delete application
    public void deleteApplication(Long id) {

        Application application = getApplicationEntityById(id);

        applicationRepository.delete(application);
    }

    // Internal helper
    private Application getApplicationEntityById(Long id) {

        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }
}