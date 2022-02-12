package com.rootnode.devtree.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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

    @Column(name = "mentoring_application_comment")
    private String mentoringApplicationComment;

    // 2022-02-10
    @Column(name = "mentoring_start_date")
    private LocalDate mentoringStartDate;   // 원래는 int로 되어있었음
    // 14:00:00
    @Column(name = "mentoring_start_time")
    private LocalTime mentoringStartTime;  // 원래는 LocalDateTime로 되어있었음
    // 2022-02-10 14:00:00
    @Column(name = "mentoring_create_time")
    private LocalDateTime mentoringCreateTime;
    @Column(name = "mentoring_state")
    @Enumerated(EnumType.STRING)
    private MentoringState mentoringState;

    public void changeMentoringState(MentoringState mentoringState) {
        this.mentoringState = mentoringState;
    }
}
