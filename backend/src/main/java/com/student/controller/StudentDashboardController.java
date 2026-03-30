package com.student.controller;

import com.student.entity.*;
import com.student.repository.*;
import com.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentDashboardController {

    private final AttendanceRepository attendanceRepository;
    private final ExamRepository examRepository;
    private final AnnouncementRepository announcementRepository;
    private final StudentService studentService;
    private final UserRepository userRepository;

    // Get attendance for logged in student
    @GetMapping("/attendance")
    public ResponseEntity<List<Attendance>> getAttendance(
            Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Student student = studentService.getMyProfile(user.getId());
        return ResponseEntity.ok(
            attendanceRepository.findByStudentId(student.getId()));
    }

    // Get upcoming exams
    @GetMapping("/exams")
    public ResponseEntity<List<Exam>> getExams() {
        return ResponseEntity.ok(
            examRepository.findByExamDateGreaterThanEqualOrderByExamDateAsc(
                LocalDate.now()));
    }

    // Get all announcements
    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> getAnnouncements() {
        return ResponseEntity.ok(
            announcementRepository.findAllByOrderByAnnouncementDateDesc());
    }

    // ADMIN: Add attendance
    @PostMapping("/admin/attendance")
    public ResponseEntity<Attendance> addAttendance(
            @RequestBody Attendance attendance) {
        return ResponseEntity.ok(
            attendanceRepository.save(attendance));
    }

    // ADMIN: Add exam
    @PostMapping("/admin/exam")
    public ResponseEntity<Exam> addExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examRepository.save(exam));
    }

    // ADMIN: Add announcement
    @PostMapping("/admin/announcement")
    public ResponseEntity<Announcement> addAnnouncement(
            @RequestBody Announcement announcement) {
        return ResponseEntity.ok(
            announcementRepository.save(announcement));
    }
}