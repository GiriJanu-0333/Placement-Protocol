package com.Protocol.Placement.entity;

import com.Protocol.Placement.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="applications", uniqueConstraints=@UniqueConstraint(columnNames={"student_id","job_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Application {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="student_id") private User student;

    @ManyToOne(optional=false) @JoinColumn(name="job_id") private Job job;

    private LocalDateTime appliedDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.APPLIED;
}
