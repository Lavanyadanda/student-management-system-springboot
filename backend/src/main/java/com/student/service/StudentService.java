package com.student.service;

import com.student.dto.StudentDTO;
import com.student.entity.*;
import com.student.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final AuthService authService;

    public Student addStudent(StudentDTO dto) {
        User user = authService.registerStudent(dto.getUsername(), dto.getPassword());

        Student student = Student.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .course(dto.getCourse())
                .gpa(dto.getGpa())
                .user(user)
                .build();

        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    public Student updateStudent(Long id, StudentDTO dto) {
        Student student = getStudentById(id);
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setCourse(dto.getCourse());
        student.setGpa(dto.getGpa());
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student getMyProfile(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}