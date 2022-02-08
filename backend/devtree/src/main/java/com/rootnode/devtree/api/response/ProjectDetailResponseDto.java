package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamState;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 프로젝트 일련번호, 프로젝트 관리자 일련번호 (사용자 테이블에서 이름을 가져와야 함)
 * 프로젝트 명,
 * 프로젝트 모집 상태
 * 프로젝트 관리자 명, -> 나중에 추가해야 한다.
 * 프로젝트 기술 스택,
 * 프로젝트 소개,
 * 프로젝트 포지션 별 인원 현황
 */
@Getter
@NoArgsConstructor
public class ProjectDetailResponseDto extends CommonResponseDto{
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
    private List<ProjectPositionInfoDto> teamPosition;

    public ProjectDetailResponseDto(Team team, String teamManagerName, List<ProjectPosition> projectPositions) {
        this.teamSeq = team.getTeamSeq();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamName = team.getTeamName();
        this.teamManagerName = teamManagerName;
        this.teamDesc = team.getTeamDesc();
        this.teamState = team.getTeamState();
        this.teamType = team.getTeamType().name();
        this.teamRecruitCnt = team.getTeamRecruitCnt();
        this.teamMemberCnt = team.getTeamMemberCnt();
        this.teamCreateTime = team.getTeamCreateTime();
        this.teamUpdateTime = team.getTeamUpdateTime();
        this.teamStartTime = team.getTeamStartTime();
        this.teamEndTime = team.getTeamEndTime();
        this.teamTech = team.toTechInfoDto();
        this.teamPosition = projectPositions.stream()
                .map(projectPosition -> new ProjectPositionInfoDto(projectPosition))
                .collect(Collectors.toList());

        this.status = 200;
        this.message = "프로젝트 정보 조회에 성공하였습니다.";
    }
}
