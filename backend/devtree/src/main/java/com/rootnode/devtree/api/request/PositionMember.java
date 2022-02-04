package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.Position;
import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PositionMember {
    private Position position;
    private int positionRecruitCnt;

    public ProjectPosition toProjectPositionEntity(Team team) {
        return ProjectPosition.builder()
                .projectPositionID(new ProjectPositionId(team.getTeamSeq(), position.getDetailPositionName()))
                .position(position)
                .team(team)
                .positionRecruitCnt(positionRecruitCnt)
                .build();
    }
}