package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPositionReservation;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectJoinListResponseDto {
    private Long userSeq;
    private String userId;
    private String detailPositionName;

    public ProjectJoinListResponseDto(ProjectPositionReservation entity) {
        this.userSeq = entity.getUser().getUserSeq();
        this.userId = entity.getUser().getUserId();
        this.detailPositionName = entity.getProjectPosition().getPosition().getDetailPositionName();
    }
}
