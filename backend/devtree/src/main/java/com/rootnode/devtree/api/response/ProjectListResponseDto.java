package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ProjectListResponseDto extends CommonResponseDto{
    private Long teamSeq;
    private Long teamManagerSeq;
    private String teamName;
    private String teamState;
    private String teamManagerName;
    private int teamRecruitCnt;
    private int teamMemberCnt;
    private List<TechInfoDto> teamTech;
    private List<ProjectPositionInfoDto> teamPosition;

    public ProjectListResponseDto(Team team, String teamMangerName, List<ProjectPosition> projectPositions) {
        this.teamSeq = team.getTeamSeq();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamName = team.getTeamName();
        this.teamState = team.getTeamState().name();
        this.teamManagerName = teamMangerName;
        this.teamRecruitCnt = team.getTeamRecruitCnt();
        this.teamMemberCnt = team.getTeamMemberCnt();
        this.teamTech = team.toTechInfoDto();
        this.teamPosition = projectPositions.stream()
                .map(projectPosition -> new ProjectPositionInfoDto(projectPosition))
                .collect(Collectors.toList());

        this.status = 200;
        this.message = "프로젝트 목록 조회에 성공하였습니다.";
    }

}
