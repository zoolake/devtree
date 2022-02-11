package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.StudyReservation;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class StudyJoinListResponseDto {
    private Long userSeq;
    private String userId;
    private LocalDateTime reservationTime;

    public StudyJoinListResponseDto(StudyReservation entity) {
        this.userSeq = entity.getUser().getUserSeq();
        this.userId = entity.getUser().getUserId();
        this.reservationTime = entity.getStudyReservationCreateTime();
    }
}
