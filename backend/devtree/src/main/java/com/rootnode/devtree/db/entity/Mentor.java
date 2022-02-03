package com.rootnode.devtree.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 *  정의.
 */
@Table(name = "tb_mentor")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mentor {
    /**
     * mentor_seq
     * mentor_career
     * mentoring_cnt
     * mentor_exp
     * mentor_desc
     */
    @Id
    @Column(name = "user_seq")
    private Long mentor_seq;
    private String mentor_career;
    private int mentoring_cnt;
    private Long mentor_exp;
    private String mentor_desc;


    /**
     * 일대일 매핑 고려
     */
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_seq")
    private  User user;
}
