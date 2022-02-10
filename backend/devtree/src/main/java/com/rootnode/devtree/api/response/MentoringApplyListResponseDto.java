package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class MentoringApplyListResponseDto {
    private Long mentoringSeq;
    private Long teamSeq;
    private LocalDate mentoringStartDate;
    private LocalTime mentoringStartTime;
    private LocalDateTime mentoringCreateTime;
    private MentoringState mentoringState;

    public MentoringApplyListResponseDto(Mentoring mentoring) {
        this.mentoringSeq = mentoring.getMentoringSeq();
        this.teamSeq = mentoring.getTeam().getTeamSeq();
        this.mentoringStartDate = mentoring.getMentoringStartDate();
        this.mentoringStartTime = mentoring.getMentoringStartTime();
        this.mentoringCreateTime = mentoring.getMentoringCreateTime();
        this.mentoringState = mentoring.getMentoringState();
    }
}
