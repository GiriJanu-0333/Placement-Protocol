package com.Protocol.Placement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Job {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String title;
    @Column(nullable=false) private String company;
    private String location;
    private String salary;
    @Column(length=2000) private String description;
    private String skillsRequired;
    private LocalDate deadline;
    private boolean active = true;
}
