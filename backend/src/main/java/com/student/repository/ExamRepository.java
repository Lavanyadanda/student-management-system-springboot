package com.student.repository;

import com.student.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByExamDateGreaterThanEqualOrderByExamDateAsc(LocalDate date);
}