package com.Protocol.Placement.dto.user;

import com.Protocol.Placement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private Role role;
}