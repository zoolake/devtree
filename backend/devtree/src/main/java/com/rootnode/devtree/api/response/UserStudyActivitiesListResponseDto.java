package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class UserStudyActivitiesListResponseDto {
    private Long teamSeq;
    private Long teamManagerSeq;
    private String teamName;
    private String teamState;
    private LocalDateTime teamStartTime;
    private LocalDateTime teamEndTime;
    private List<TechInfoDto> teamTech;

    public UserStudyActivitiesListResponseDto(Team team) {
        this.teamSeq = team.getTeamSeq();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamName = team.getTeamName();
        this.teamState = team.getTeamState().name();
        this.teamStartTime = team.getTeamStartTime();
        this.teamEndTime = team.getTeamEndTime();
        this.teamTech = team.toTechInfoDto();
    }
}
