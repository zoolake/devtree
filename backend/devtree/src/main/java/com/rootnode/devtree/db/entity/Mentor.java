package com.rootnode.devtree.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_mentor")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mentor {

    @Id
    @Column(name = "mentor_seq")
    private Long mentorSeq;

    @Column(name = "mentor_career")
    private String mentorCareer;
    @Column(name = "mentoring_cnt")
    private int mentoringCnt;
    @Column(name = "mentor_exp")
    private Long mentorExp;
    @Column(name = "mentor_desc")
    private String mentorDesc;


    /**
     * 일대일 매핑 고려
     */
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId("mentorSeq")
    @JoinColumn(name = "mentor_seq", unique = true)
    private User user;
}
