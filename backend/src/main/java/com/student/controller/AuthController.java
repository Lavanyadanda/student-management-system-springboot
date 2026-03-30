// package com.student.controller;

// import com.student.dto.*;
// import com.student.service.AuthService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// @RequiredArgsConstructor
// public class AuthController {

//     private final AuthService authService;

//     @PostMapping("/login")
//     public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//         return ResponseEntity.ok(authService.login(request));
//     }
// }

package com.student.controller;

import com.student.dto.*;
import com.student.entity.User;
import com.student.repository.UserRepository;
import com.student.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // ✅ Temporary endpoint to create admin
    @GetMapping("/setup")
    public ResponseEntity<String> setup() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            return ResponseEntity.ok("✅ Admin created successfully!");
        }
        return ResponseEntity.ok("⚠️ Admin already exists!");
    }
}