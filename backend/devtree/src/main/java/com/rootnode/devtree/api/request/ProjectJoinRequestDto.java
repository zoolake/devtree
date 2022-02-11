package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.Position;
import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.ProjectPositionReservation;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionReservationId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ProjectJoinRequestDto {
    private Long userSeq;
    private String detailPositionName;

    public ProjectPositionReservation toEntity(Long teamSeq, User user, ProjectPosition projectPosition) {
        return ProjectPositionReservation.builder()
                .projectPositionReservationID(
                        new ProjectPositionReservationId(user.getUserSeq(), new ProjectPositionId(teamSeq, this.detailPositionName)))
                .projectPosition(projectPosition)
                .user(user)
                .projectReservationCreateTime(LocalDateTime.now())
                .build();
    }

}
