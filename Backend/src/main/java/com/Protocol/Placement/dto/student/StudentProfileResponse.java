package com.Protocol.Placement.dto.student;

import com.Protocol.Placement.dto.skill.SkillResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class StudentProfileResponse {

    private Long id;

    private Long userId;

    private String fullName;

    private String phone;

    private String college;

    private String course;

    private Integer graduationYear;

    private String bio;

    private String resumeUrl;

    private String profilePictureUrl;

    private Set<SkillResponse> skills;
}