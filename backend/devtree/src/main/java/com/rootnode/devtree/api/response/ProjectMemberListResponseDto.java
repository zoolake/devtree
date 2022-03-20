package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPositionUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectMemberListResponseDto {
    private Long userSeq;
    private String userName;
    private String detailPositionName;

    public ProjectMemberListResponseDto(ProjectPositionUser projectPositionUser, String userName) {
        this.userSeq = projectPositionUser.getUser().getUserSeq();
        this.userName = userName;
        this.detailPositionName = projectPositionUser.getProjectPositionUserID().getProjectPositionID().getDetailPositionName();
    }
}
