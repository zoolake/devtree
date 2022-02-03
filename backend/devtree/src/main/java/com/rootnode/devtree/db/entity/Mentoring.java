package com.rootnode.devtree.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "tb_mentoring_reservation")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mentoring extends BaseTimeEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mentoring_seq;

    @ManyToOne
    @JoinColumn(name = "team_seq")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "mentor_seq")
    private Mentor mentor;

    private LocalDateTime mentoring_start_time;
    private LocalDateTime mentoring_create_time;    // auditing 고려
    private MentoringState mentoring_state;
}
