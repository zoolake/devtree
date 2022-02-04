package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.api.response.TechInfoDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Table(name = "tb_team")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Team extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // 팀 조회 할 때 (팀_기술스택) 필요
    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<TeamTech> teamTechList = new ArrayList<>();

    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<ProjectPosition> teamPositionList = new ArrayList<>();

    /**
     * teamTechList -> TechInfoDto로 변환해주는 메소드
     * 목록조회와 상세조회에 공통적으로 사용되므로
     * 도메인 계층에서 메소드로 따로 추출하여 관리하는 방식 선택
     * Respository에서 fetch join으로 들고오기 때문에
     * 지연로딩의 프록시 객체로 인한 에러는 발생하지 않는다.
     */
    public List<TechInfoDto> toTechInfoDto() {
        return this.teamTechList.stream()
                .map(teamTech -> new TechInfoDto(teamTech.getTech()))
                .collect(Collectors.toList());
    }

    /**
     * 팀원 증가시 사용하는 메소드 (프로젝트 신청 수락, 스터디 신청 수락 등..)
     */
    public void addTeamMember() {
        this.team_member_cnt += 1;
    }


    /**
     * 프로젝트 정보를 수정하기 위한 메소드들 (setter 대신 사용)
     */
    public void changeTeamManger(Long team_manager_seq) {
        this.team_manager_seq = team_manager_seq;
    }

    public void changeTeamState(TeamState team_state) {
        this.team_state = team_state;

        // 모집완료 상태가 되면 team_start_time 설정
        if(TeamState.COMPLETED.equals(this.team_state)) {
            this.team_start_time = LocalDateTime.now();
        }

        // 팀 종료 상태가 되면 team_end_time 설정
        if(TeamState.FINISH.equals(this.team_state)) {
            this.team_end_time = LocalDateTime.now();
        }
    }

    public void changeTeamName(String team_name) {
        this.team_name = team_name;
    }
    public void changeTeamDesc(String team_desc) {
        this.team_desc = team_desc;
    }
    public void changeTeamRecruitCnt(int team_recruit_cnt) {
        this.team_recruit_cnt = team_recruit_cnt;
    }
}
