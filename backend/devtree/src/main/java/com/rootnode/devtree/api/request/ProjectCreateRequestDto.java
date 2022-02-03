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
    private Long team_manager_seq;
    private String team_name;
    private String team_desc;
    private TeamState team_state;
    private TeamType team_type;

    private List<Long> team_tech;
    private List<PositionMember> team_position;


    public Team toEntity() {
        int team_recruit_cnt = team_position.stream()
                .mapToInt(PositionMember::getPosition_recruit_cnt)
                .sum();

        return Team.builder()
                .team_manager_seq(team_manager_seq)
                .team_name(team_name)
                .team_desc(team_desc)
                .team_state(team_state)
                .team_type(team_type)
                .team_recruit_cnt(team_recruit_cnt)
                .build();
    }
}
