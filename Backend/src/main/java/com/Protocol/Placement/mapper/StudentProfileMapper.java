package com.Protocol.Placement.mapper;

import com.Protocol.Placement.dto.skill.SkillResponse;
import com.Protocol.Placement.dto.student.StudentProfileResponse;
import com.Protocol.Placement.entity.StudentProfile;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class StudentProfileMapper {

    public StudentProfileResponse toResponse(StudentProfile profile) {

        StudentProfileResponse response =
                new StudentProfileResponse();

        response.setId(profile.getId());

        if (profile.getUser() != null) {
            response.setUserId(profile.getUser().getId());
        }

        response.setFullName(profile.getFullName());
        response.setPhone(profile.getPhone());
        response.setCollege(profile.getCollege());
        response.setCourse(profile.getCourse());
        response.setGraduationYear(profile.getGraduationYear());
        response.setBio(profile.getBio());
        response.setResumeUrl(profile.getResumeUrl());
        response.setProfilePictureUrl(profile.getProfilePictureUrl());

        if (profile.getSkills() != null) {

            response.setSkills(
                    profile.getSkills()
                            .stream()
                            .map(skill ->
                                    new SkillResponse(
                                            skill.getId(),
                                            skill.getName()
                                    )
                            )
                            .collect(Collectors.toSet())
            );
        }

        return response;
    }
}