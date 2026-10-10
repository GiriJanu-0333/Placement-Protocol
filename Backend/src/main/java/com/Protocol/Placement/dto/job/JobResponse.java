package com.Protocol.Placement.dto.job;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class JobResponse {

    private Long id;

    private String title;

    private String company;

    private String location;

    private String salary;

    private String description;

    private String skillsRequired;

    private LocalDate deadline;

    private boolean active;
}