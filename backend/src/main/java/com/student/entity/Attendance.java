package com.student.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id")
    private Long studentId;

    private String subject;

    @Column(name = "present_count")
    private Integer presentCount;

    @Column(name = "total_count")
    private Integer totalCount;
}