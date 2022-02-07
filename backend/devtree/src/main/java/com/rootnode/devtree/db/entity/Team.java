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
    @Column(name = "team_seq")
    private Long teamSeq;

    @Column(name = "team_manager_seq")
    private Long teamManagerSeq;

    @Column(name = "team_type")
    @Enumerated(EnumType.STRING)
    private TeamType teamType;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "team_desc")
    private String teamDesc;

    @Column(name = "team_state")
    @Enumerated(EnumType.STRING)
    private TeamState teamState;

    @Column(name = "team_recruit_cnt")
    private int teamRecruitCnt;
    @Column(name = "team_member_cnt")
    private int teamMemberCnt;

    @Column(name = "team_start_time")
    private LocalDateTime teamStartTime;
    @Column(name = "team_end_time")
    private LocalDateTime teamEndTime;

    @Column(name = "team_favorites_cnt")
    private int teamFavoritesCnt;

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
        this.teamMemberCnt += 1;
    }


    /**
     * 프로젝트 정보를 수정하기 위한 메소드들 (setter 대신 사용)
     */
    public void changeTeamState(TeamState teamState) {
        this.teamState = teamState;

        // 모집완료 상태가 되면 team_start_time 설정
        if(TeamState.COMPLETED.equals(this.teamState)) {
            this.teamStartTime = LocalDateTime.now();
        }

        // 팀 종료 상태가 되면 team_end_time 설정
        if(TeamState.FINISH.equals(this.teamState)) {
            this.teamEndTime = LocalDateTime.now();
        }
    }

    public void changeTeamManager(Long teamManagerSeq) { this.teamManagerSeq = teamManagerSeq; }
    public void changeTeamName(String teamName) { this.teamName = teamName; }
    public void changeTeamDesc(String teamDesc) { this.teamDesc = teamDesc; }
    public void changeTeamRecruitCnt(int teamRecruitCnt) { this.teamRecruitCnt = teamRecruitCnt; }
}
