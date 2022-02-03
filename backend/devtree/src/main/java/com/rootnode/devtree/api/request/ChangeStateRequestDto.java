package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.TeamState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ChangeStateRequestDto {
    private Long team_seq;
    private TeamState team_state;
}
