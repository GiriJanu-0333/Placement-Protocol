package com.Protocol.Placement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="student_profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class StudentProfile {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @OneToOne(optional=false)
    @JoinColumn(name="user_id", unique=true)
    @JsonBackReference
    private User user;
    private String fullName;
    private String phone;
    private String college;
    private String course;
    private Integer graduationYear;
    @Column(length=1000) private String bio;
    private String resumeUrl;
    private String profilePictureUrl;
    @ManyToMany
    @JoinTable(name="student_skill", joinColumns=@JoinColumn(name="student_id"), inverseJoinColumns=@JoinColumn(name="skill_id"))
    private Set<Skill> skills = new HashSet<>();
}
