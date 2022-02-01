package com.rootnode.devtree.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Table(name = "tb_team")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Team extends BaseTimeEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long team_seq;

    private Long team_manager_seq;

    @Enumerated(EnumType.STRING)
    private TeamType team_type;

    private String team_name;

    private String team_desc;

    @Enumerated(EnumType.STRING)
    private TeamState team_state;

    private int team_recruit_cnt;
    private int team_member_cnt;

    private LocalDateTime team_start_time;
    private LocalDateTime team_end_time;

    private int team_favorites_cnt;

    // 프로젝트 조회 할 때 (팀_기술스택) 필요
    @OneToMany(mappedBy = "team")
    private List<TeamTech> teamTechList;
}
