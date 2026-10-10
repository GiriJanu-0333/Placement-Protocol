package com.Protocol.Placement.mapper;

import com.Protocol.Placement.dto.job.JobRequest;
import com.Protocol.Placement.dto.job.JobResponse;
import com.Protocol.Placement.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    // JobRequest → Job Entity
    public Job toEntity(JobRequest request) {

        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setSalary(request.getSalary());
        job.setDescription(request.getDescription());
        job.setSkillsRequired(request.getSkillsRequired());
        job.setDeadline(request.getDeadline());
        job.setActive(request.isActive());

        return job;
    }

    // Job Entity → JobResponse
    public JobResponse toResponse(Job job) {

        JobResponse response = new JobResponse();

        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setCompany(job.getCompany());
        response.setLocation(job.getLocation());
        response.setSalary(job.getSalary());
        response.setDescription(job.getDescription());
        response.setSkillsRequired(job.getSkillsRequired());
        response.setDeadline(job.getDeadline());
        response.setActive(job.isActive());

        return response;
    }



}