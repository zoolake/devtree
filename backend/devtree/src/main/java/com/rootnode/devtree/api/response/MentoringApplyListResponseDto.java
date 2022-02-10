package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.*;
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
    private String teamName;
    private TeamType teamType;
    private String mentoringApplyComment;
    private LocalDate mentoringStartDate;
    private LocalTime mentoringStartTime;
    private LocalDateTime mentoringCreateTime;
    private MentoringState mentoringState;

    public MentoringApplyListResponseDto(Mentoring mentoring) {
        this.mentoringSeq = mentoring.getMentoringSeq();
        this.teamSeq = mentoring.getTeam().getTeamSeq();
        this.mentoringStartDate = mentoring.getMentoringStartDate();
        this.mentoringStartTime = mentoring.getMentoringStartTime();
        this.mentoringApplyComment = mentoring.getMentoringApplicationComment();
        this.mentoringCreateTime = mentoring.getMentoringCreateTime();
        this.mentoringState = mentoring.getMentoringState();

        this.teamName = mentoring.getTeam().getTeamName();
        this.teamType = mentoring.getTeam().getTeamType();
    }
}
