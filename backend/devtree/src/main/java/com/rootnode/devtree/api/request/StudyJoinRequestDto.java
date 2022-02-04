package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.StudyReservation;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.compositeKey.StudyReservationId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyJoinRequestDto {
    private Long user_seq;

    public StudyReservation toEntity(Long team_seq, Team team, User user) {
        return StudyReservation.builder()
                .studyReservationID(new StudyReservationId(this.user_seq, team_seq))
                .team(team)
                .user(user)
                .study_reservation_create_time(LocalDateTime.now())
                .build();
    }
}
