package com.Protocol.Placement.repository;

import com.Protocol.Placement.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByStudentIdAndJobId(Long studentId, Long jobId);

    List<Application> findByStudentIdOrderByAppliedDateDesc(Long studentId);

    List<Application> findByJobId(Long jobId);

    List<Application> findAllByOrderByAppliedDateDesc();
}