package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamState;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyCreateRequestDto {
    private Long teamManagerSeq;
    private String teamName;
    private String teamDesc;
    private TeamState teamState;
    private TeamType teamType;
    private int teamRecruitCnt;
    private List<Long> teamTech;

    public Team toEntity(){
        return Team.builder()
                .teamManagerSeq(teamManagerSeq)
                .teamName(teamName)
                .teamDesc(teamDesc)
                .teamState(teamState)
                .teamType(teamType)
                .teamRecruitCnt(teamRecruitCnt)
                .build();
    }
}
