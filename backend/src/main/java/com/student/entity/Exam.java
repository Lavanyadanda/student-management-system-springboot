package com.student.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "exams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    @Column(name = "exam_date")
    private LocalDate examDate;

    @Column(name = "exam_time")
    private String examTime;

    private String room;

    @Column(name = "exam_type")
    private String examType;
}