

package com.student.controller;

import com.student.dto.StudentDTO;
import com.student.entity.Student;
import com.student.entity.User;
import com.student.repository.UserRepository;
import com.student.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final UserRepository userRepository;

    @PostMapping("/api/admin/students")
    public ResponseEntity<Student> addStudent(
            @Valid @RequestBody StudentDTO dto) {
        return ResponseEntity.ok(studentService.addStudent(dto));
    }

    @GetMapping("/api/admin/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/api/admin/students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PutMapping("/api/admin/students/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentDTO dto) {
        return ResponseEntity.ok(studentService.updateStudent(id, dto));
    }

    @DeleteMapping("/api/admin/students/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    @GetMapping("/api/student/profile")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Student student = studentService.getMyProfile(user.getId());
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body("Profile not found: " + e.getMessage());
        }
    }
}
