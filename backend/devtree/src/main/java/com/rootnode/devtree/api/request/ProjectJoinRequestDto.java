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
    private Long user_seq;
    private String detail_position_name;

    public ProjectPositionReservation toEntity(Long team_seq, User user, ProjectPosition projectPosition) {
        return ProjectPositionReservation.builder()
                .projectPositionReservationID(
                        new ProjectPositionReservationId(this.user_seq, new ProjectPositionId(team_seq, this.detail_position_name)))
                .projectPosition(projectPosition)
                .user(user)
                .project_reservation_create_time(LocalDateTime.now())
                .build();

    }
}
