package com.Protocol.Placement.config;

import com.Protocol.Placement.entity.User;
import com.Protocol.Placement.enums.Role;
import com.Protocol.Placement.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminUserInitializer {

    @Bean
    public CommandLineRunner createDefaultUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            // =========================
            // CREATE ADMIN
            // =========================

            if (userRepository.findByUsername("admin").isEmpty()) {

                User admin = new User();

                admin.setUsername("admin");
                admin.setEmail("admin@placement.com");
                admin.setPassword(
                        passwordEncoder.encode("admin1234")
                );
                admin.setRole(Role.ROLE_ADMIN);

                userRepository.save(admin);

                System.out.println("Default admin user created");
            }


            // =========================
            // CREATE STUDENT
            // =========================

            if (userRepository.findByUsername("student").isEmpty()) {

                User student = new User();

                student.setUsername("student");
                student.setEmail("student@placement.com");
                student.setPassword(
                        passwordEncoder.encode("student1234")
                );
                student.setRole(Role.ROLE_STUDENT);

                userRepository.save(student);

                System.out.println("Default student user created");
            }
        };
    }
}