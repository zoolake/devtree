package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamState;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private Long teamManagerSeq;
    private String teamName;
    private TeamState teamState;
    private String teamManagerName;
    private int teamRecruitCnt;
    private int teamMemberCnt;
    private List<TechInfoDto> teamTech;

    public StudyDetailResponseDto(Team team, String teamManagerName) {
        this.teamSeq = team.getTeamSeq();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamName = team.getTeamName();
        this.teamState = team.getTeamState();
        this.teamManagerName = teamManagerName;
        this.teamRecruitCnt = team.getTeamRecruitCnt();
        this.teamMemberCnt = team.getTeamMemberCnt();
        this.teamTech = team.toTechInfoDto();
    }
}
