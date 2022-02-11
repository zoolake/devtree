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
    @MapsId("userSeq")
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("teamSeq")
    @JoinColumn(name = "team_seq")
    private Team team;

    @Column(name = "study_reservation_create_time")
    private LocalDateTime studyReservationCreateTime;
}
