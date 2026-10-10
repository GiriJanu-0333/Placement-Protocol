package com.Protocol.Placement.mapper;

import com.Protocol.Placement.dto.user.UserResponse;
import com.Protocol.Placement.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }
}