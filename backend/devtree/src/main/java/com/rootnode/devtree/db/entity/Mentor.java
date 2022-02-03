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
    private Long mentor_seq;

    private String mentor_career;
    private int mentoring_cnt;
    private Long mentor_exp;
    private String mentor_desc;


    /**
     * 일대일 매핑 고려
     */
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId("mentor_seq")
    @JoinColumn(name = "mentor_seq", unique = true)
    private User user;
}
