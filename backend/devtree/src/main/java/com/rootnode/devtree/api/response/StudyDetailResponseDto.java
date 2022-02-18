package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamState;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 스터디 일련번호, 스터디 관리자 일련번호
 * 스터디명,
 * 스터디 상태
 * 스터디 관리자 명 (유저 테이블)
 * 스터디 소개
 * 스터디 모집 인원,
 * 스터디 현재 인원,
 * 스터디 기술 스택
 */
@Getter
@NoArgsConstructor
public class StudyDetailResponseDto {
    private Long teamSeq;
    private String teamName;
    private Long teamManagerSeq;
    private String teamManagerName;
    private String teamType;
    private String teamDesc;
    private TeamState teamState;
    private int teamRecruitCnt;
    private int teamMemberCnt;
    private LocalDateTime teamCreateTime;
    private LocalDateTime teamUpdateTime;
    private LocalDateTime teamStartTime;
    private LocalDateTime teamEndTime;
    private List<TechInfoDto> teamTech;

    public StudyDetailResponseDto(Team team, String teamManagerName) {
        this.teamSeq = team.getTeamSeq();
        this.teamName = team.getTeamName();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamManagerName = teamManagerName;
        this.teamType = team.getTeamType().name();
        this.teamDesc = team.getTeamDesc();
        this.teamState = team.getTeamState();
        this.teamRecruitCnt = team.getTeamRecruitCnt();
        this.teamMemberCnt = team.getTeamMemberCnt();
        this.teamCreateTime = team.getTeamCreateTime();
        this.teamUpdateTime = team.getTeamUpdateTime();
        this.teamStartTime = team.getTeamStartTime();
        this.teamEndTime = team.getTeamEndTime();
        this.teamTech = team.toTechInfoDto();
    }
}
