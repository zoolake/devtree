package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * [미완성 상태]
 * 필요한 필드
 * 1. 기술스택 리스트
 * 2. 포지션 별 정원 수 [완료]
 */
@Getter
@NoArgsConstructor
@Builder @AllArgsConstructor
public class ProjectCreateRequestDto {
    private Long teamManagerSeq;
    private String teamName;
    private String teamDesc;
    private TeamState teamState;
    private TeamType teamType;

    private List<Long> teamTech;
    private List<PositionMember> teamPosition;

    public void setTeamManagerSeq(Long teamManagerSeq){
        this.teamManagerSeq = teamManagerSeq;
    }

    public Team toEntity() {
        int teamRecruitCnt = teamPosition.stream()
                .mapToInt(PositionMember::getPositionRecruitCnt)
                .sum();

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
