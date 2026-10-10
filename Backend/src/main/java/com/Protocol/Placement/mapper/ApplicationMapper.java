package com.Protocol.Placement.mapper;

import com.Protocol.Placement.dto.application.ApplicationResponse;
import com.Protocol.Placement.dto.skill.SkillResponse;
import com.Protocol.Placement.entity.Application;
import com.Protocol.Placement.entity.StudentProfile;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ApplicationMapper {

    public ApplicationResponse toResponse(Application application) {

        ApplicationResponse response = new ApplicationResponse();

        // Application details
        response.setId(application.getId());
        response.setStatus(application.getStatus());
        response.setAppliedDate(application.getAppliedDate());

        // Job details
        if (application.getJob() != null) {

            response.setJobId(application.getJob().getId());
            response.setJobTitle(application.getJob().getTitle());
            response.setCompany(application.getJob().getCompany());
            response.setLocation(application.getJob().getLocation());
        }

        // Student details
        if (application.getStudent() != null) {

            response.setStudentId(application.getStudent().getId());


            response.setUsername(application.getStudent().getUsername());
            response.setEmail(application.getStudent().getEmail());

            // Student profile
            StudentProfile profile =
                    application.getStudent().getStudentProfile();

            if (profile != null) {

                response.setStudentName(profile.getFullName());
                response.setCollege(profile.getCollege());
                response.setCourse(profile.getCourse());
                response.setGraduationYear(profile.getGraduationYear());

                // Student skills
                if (profile.getSkills() != null) {

                    response.setSkills(
                            profile.getSkills()
                                    .stream()
                                    .map(skill -> new SkillResponse(
                                            skill.getId(),
                                            skill.getName()
                                    ))
                                    .collect(Collectors.toSet())
                    );
                }
            }
        }

        return response;
    }
}