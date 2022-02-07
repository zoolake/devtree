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
    private Long teamManagerSeq;
    private String teamName;
    private String teamDesc;

    private List<Long> teamTech;
    private List<PositionMember> teamPosition;
}
