package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPosition;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ProjectPositionDetailResponseDto extends CommonResponseDto{
    private List<ProjectPositionInfoDto> team_position;


    public ProjectPositionDetailResponseDto(List<ProjectPosition> projectPositions) {
        this.team_position = projectPositions.stream()
                .map(projectPosition -> new ProjectPositionInfoDto(projectPosition))
                .collect(Collectors.toList());
        this.status = 200;
        this.message = "프로젝트 포지션 조회에 성공하였습니다.";

    }
}
