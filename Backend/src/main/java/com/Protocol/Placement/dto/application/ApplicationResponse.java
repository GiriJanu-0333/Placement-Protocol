package com.Protocol.Placement.dto.application;

import com.Protocol.Placement.dto.skill.SkillResponse;
import com.Protocol.Placement.enums.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class ApplicationResponse {

    private Long id;

    // Job details
    private Long jobId;
    private String jobTitle;
    private String company;
    private String location;

    // Student details
    private Long studentId;
    private String username;
    private String email;
    private String studentName;
    private String college;
    private String course;
    private Integer graduationYear;

    // Skills
    private Set<SkillResponse> skills;

    // Application status
    private LocalDateTime appliedDate;
    private ApplicationStatus status;
}