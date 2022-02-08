package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TeamListDto {
    private Long teamSeq;
    private TeamType teamType;

    public TeamListDto(Long teamSeq, TeamType teamType) {
        this.teamSeq = teamSeq;
        this.teamType = teamType;
    }
}