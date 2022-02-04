package com.rootnode.devtree.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ProjectUpdateRequestDto {
    private Long team_manager_seq;
    private String team_name;
    private String team_desc;

    private List<Long> team_tech;
    private List<PositionMember> team_position;
}
