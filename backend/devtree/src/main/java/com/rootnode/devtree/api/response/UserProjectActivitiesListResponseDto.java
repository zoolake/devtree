package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UserProjectActivitiesListResponseDto {
    private Long teamSeq;
    private Long teamManagerSeq;
    private String teamName;
    private String teamState;
    private LocalDateTime teamStartTime;
    private LocalDateTime teamEndTime;
    private List<TechInfoDto> teamTech;
    private List<ProjectPositionInfoDto> teamPosition;

    public UserProjectActivitiesListResponseDto(Team team, List<ProjectPosition> projectPositions) {
        this.teamSeq = team.getTeamSeq();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamName = team.getTeamName();
        this.teamState = team.getTeamState().name();
        this.teamStartTime = team.getTeamStartTime();
        this.teamEndTime = team.getTeamEndTime();
        this.teamTech = team.toTechInfoDto();
        this.teamPosition = projectPositions.stream()
                .map(projectPosition -> new ProjectPositionInfoDto(projectPosition))
                .collect(Collectors.toList());
    }
}
