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
    private Long userSeq;

    public StudyReservation toEntity(Long teamSeq, Team team, User user) {
        return StudyReservation.builder()
                .studyReservationID(new StudyReservationId(this.userSeq, teamSeq))
                .team(team)
                .user(user)
                .studyReservationCreateTime(LocalDateTime.now())
                .build();
    }
}
