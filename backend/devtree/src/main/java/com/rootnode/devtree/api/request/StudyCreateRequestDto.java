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
    private Long team_manager_seq;
    private String team_name;
    private String team_desc;
    private TeamState team_state;
    private TeamType team_type;
    private int team_recruit_cnt;
    private List<Long> team_tech;

    public Team toEntity(){
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
