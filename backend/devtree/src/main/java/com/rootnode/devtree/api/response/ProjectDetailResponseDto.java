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
    private Long team_seq;
    private Long team_manager_seq;
    private String team_name;
    private TeamState team_state;
    private String team_manager_name;
    private List<TechInfoDto> team_tech;
    private List<ProjectPositionInfoDto> team_position;

    private int status;
    private String message;

    public ProjectDetailResponseDto(Team team, String team_manager_name, List<ProjectPosition> projectPositions) {
        this.team_seq = team.getTeam_seq();
        this.team_manager_seq = team.getTeam_manager_seq();
        this.team_name = team.getTeam_name();
        this.team_manager_name = team_manager_name;
        this.team_state = team.getTeam_state();
        this.team_tech = team.toTechInfoDto();
        this.team_position = projectPositions.stream()
                .map(projectPosition -> new ProjectPositionInfoDto(projectPosition))
                .collect(Collectors.toList());

        this.status = 200;
        this.message = "프로젝트 정보 조회에 성공하였습니다.";
    }
}
