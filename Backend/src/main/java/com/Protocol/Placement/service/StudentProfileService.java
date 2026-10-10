package com.Protocol.Placement.service;

import com.Protocol.Placement.dto.student.StudentProfileResponse;
import com.Protocol.Placement.entity.StudentProfile;
import com.Protocol.Placement.entity.User;
import com.Protocol.Placement.mapper.StudentProfileMapper;
import com.Protocol.Placement.repository.SkillRepository;
import com.Protocol.Placement.repository.StudentProfileRepository;
import com.Protocol.Placement.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.Protocol.Placement.entity.Skill;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final StudentProfileMapper studentProfileMapper;
    private final CloudinaryService cloudinaryService;
private final SkillRepository skillRepository;
    public StudentProfileService(
            StudentProfileRepository studentProfileRepository,
            UserRepository userRepository,
            StudentProfileMapper studentProfileMapper,
            CloudinaryService cloudinaryService,
            SkillRepository skillRepository) {

        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.studentProfileMapper = studentProfileMapper;
        this.cloudinaryService = cloudinaryService;
        this.skillRepository=skillRepository;
    }

    // =========================
    // CREATE PROFILE
    // =========================

    public StudentProfileResponse createProfile(
            Long userId,
            StudentProfile profile,
            MultipartFile profilePicture) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (studentProfileRepository.existsByUserId(userId)) {
            throw new RuntimeException(
                    "Student profile already exists"
            );
        }

        if (profilePicture == null ||
                profilePicture.isEmpty()) {

            throw new RuntimeException(
                    "Profile picture is required"
            );
        }

        String imageUrl =
                cloudinaryService.uploadImage(profilePicture);

        profile.setUser(user);
        profile.setProfilePictureUrl(imageUrl);

        StudentProfile savedProfile =
                studentProfileRepository.save(profile);

        return studentProfileMapper.toResponse(savedProfile);
    }

    // =========================
    // GET BY ID
    // =========================

    public StudentProfileResponse getById(Long id) {

        StudentProfile profile =
                studentProfileRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found"
                                ));

        return studentProfileMapper.toResponse(profile);
    }

    // =========================
    // GET BY USER ID
    // =========================

    public StudentProfileResponse getByUserId(Long userId) {

        StudentProfile profile =
                studentProfileRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found"
                                ));

        return studentProfileMapper.toResponse(profile);
    }

    // =========================
    // GET ALL
    // =========================

    public List<StudentProfileResponse> getAllProfiles() {

        return studentProfileRepository.findAll()
                .stream()
                .map(studentProfileMapper::toResponse)
                .collect(Collectors.toList());
    }

    // =========================
    // UPDATE PROFILE
    // =========================

    public StudentProfileResponse updateProfile(
            Long userId,
            StudentProfile updatedProfile,
            MultipartFile profilePicture) {

        StudentProfile existingProfile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found"
                                ));

        existingProfile.setFullName(
                updatedProfile.getFullName()
        );

        existingProfile.setPhone(
                updatedProfile.getPhone()
        );

        existingProfile.setCollege(
                updatedProfile.getCollege()
        );

        existingProfile.setCourse(
                updatedProfile.getCourse()
        );

        existingProfile.setGraduationYear(
                updatedProfile.getGraduationYear()
        );

        existingProfile.setBio(
                updatedProfile.getBio()
        );

        existingProfile.setResumeUrl(
                updatedProfile.getResumeUrl()
        );

        if (profilePicture != null &&
                !profilePicture.isEmpty()) {

            String imageUrl =
                    cloudinaryService.uploadImage(
                            profilePicture
                    );

            existingProfile.setProfilePictureUrl(
                    imageUrl
            );
        }

        StudentProfile savedProfile =
                studentProfileRepository.save(
                        existingProfile
                );

        return studentProfileMapper.toResponse(
                savedProfile
        );
    }
    // =========================
    // ADD SKILL TO STUDENT
    // =========================

    public StudentProfileResponse addSkill(
            Long userId,
            Long skillId) {

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found"
                                ));

        Skill skill =
                skillRepository.findById(skillId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Skill not found"
                                ));

        // Check if skill is already added
        boolean alreadyAdded =
                profile.getSkills()
                        .stream()
                        .anyMatch(existingSkill ->
                                existingSkill.getId()
                                        .equals(skillId)
                        );

        if (alreadyAdded) {
            throw new RuntimeException(
                    "Skill already added to profile"
            );
        }

        // Add skill
        profile.getSkills().add(skill);

        // Save profile
        StudentProfile savedProfile =
                studentProfileRepository.save(profile);

        return studentProfileMapper.toResponse(
                savedProfile
        );
    }
    //Remove skill
    public StudentProfileResponse removeSkill(Long userId, Long skillId) {

        StudentProfile profile =
                studentProfileRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException("Student profile not found"));

        Skill skill =
                skillRepository.findById(skillId)
                        .orElseThrow(() ->
                                new RuntimeException("Skill not found"));

        if (!profile.getSkills().contains(skill)) {
            throw new RuntimeException("Skill is not added to profile");
        }

        profile.getSkills().remove(skill);

        StudentProfile savedProfile =
                studentProfileRepository.save(profile);

        return studentProfileMapper.toResponse(savedProfile);
    }

    // =========================
    // DELETE PROFILE
    // =========================

    public void deleteProfile(Long userId) {

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found"
                                ));

        studentProfileRepository.delete(profile);
    }
}