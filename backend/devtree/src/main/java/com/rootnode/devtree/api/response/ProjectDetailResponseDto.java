package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamState;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
public class ProjectDetailResponseDto {
    private Long teamSeq;
    private Long teamManagerSeq;
    private String teamName;
    private String teamManagerName;
    private TeamState teamState;
    private List<TechInfoDto> teamTech;
    private List<ProjectPositionInfoDto> teamPosition;

    public ProjectDetailResponseDto(Team team, String teamManagerName, List<ProjectPosition> projectPositions) {
        this.teamSeq = team.getTeamSeq();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamName = team.getTeamName();
        this.teamManagerName = teamManagerName;
        this.teamState = team.getTeamState();
        this.teamTech = team.toTechInfoDto();
        this.teamPosition = projectPositions.stream()
                .map(projectPosition -> new ProjectPositionInfoDto(projectPosition))
                .collect(Collectors.toList());
    }
}
