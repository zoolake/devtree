package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TeamInfoDto {
    private Long teamSeq;
    private String teamName;
    private TeamType teamType;

    public TeamInfoDto(Team team) {
        this.teamSeq = team.getTeamSeq();
        this.teamName = team.getTeamName();
        this.teamType = team.getTeamType();
    }
}
