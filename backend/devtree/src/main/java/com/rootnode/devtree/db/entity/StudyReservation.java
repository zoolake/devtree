package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.StudyReservationId;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "tb_study_reservation")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StudyReservation {
    @EmbeddedId
    private StudyReservationId studyReservationID;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_seq")
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("team_seq")
    @JoinColumn(name = "team_seq")
    private Team team;

    private LocalDateTime study_reservation_create_time;
}
