package com.Protocol.Placement.repository;

import com.Protocol.Placement.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByActiveTrue();

    List<Job> findByCompanyIgnoreCase(String company);
}