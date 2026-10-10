package com.Protocol.Placement.dto.auth;

import com.Protocol.Placement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
private Long id;
    private String token;
    private String username;
    private Role role;
    private String email;
}