
        package com.Protocol.Placement.controller;
        import com.Protocol.Placement.dto.auth.AuthResponse;
        import com.Protocol.Placement.dto.auth.LoginRequest;
        import com.Protocol.Placement.dto.auth.RegisterRequest;
        import org.springframework.security.authentication.AuthenticationManager;
        import com.Protocol.Placement.entity.User;
import com.Protocol.Placement.enums.Role;
import com.Protocol.Placement.security.JwtService;
import com.Protocol.Placement.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
        import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        return userService.createUser(user);
    }


    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userService.getByUsername(request.getUsername());

        String token = jwtService.generate(
                user.getUsername(),
                user.getRole()
        );

        return new AuthResponse(
                user.getId(),
                token,
                user.getUsername(),
                user.getRole(),
                user.getEmail()
        );
    }




}

