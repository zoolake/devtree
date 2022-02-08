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
public class Mentoring {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mentoring_seq")
    private Long mentoringSeq;

    @ManyToOne
    @JoinColumn(name = "team_seq")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "mentor_seq")
    private Mentor mentor;

    @Column(name = "mentoring_start_time")
    private LocalDateTime mentoringStartTime;
    @Column(name = "mentoring_start_day")
    private int mentoringStartDay;
    @Column(name = "mentoring_create_time")
    private LocalDateTime mentoringCreateTime;
    @Column(name = "mentoring_state")
    @Enumerated(EnumType.STRING)
    private MentoringState mentoringState;
}
