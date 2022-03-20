package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class UserMentoringActivitiesResponseDto {
    private Long mentorSeq;
    private String mentorName;
    private Long teamSeq;
    private TeamType teamType;
    private LocalDate mentoringStartDate;
    private LocalTime mentoringStartTime;
    private LocalDateTime mentoringCreateTime;
    private String mentoringState;

    public UserMentoringActivitiesResponseDto(Mentoring mentoring, TeamType teamType) {
        this.mentorSeq = mentoring.getMentor().getMentorSeq();
        this.mentorName = mentoring.getMentor().getUser().getUserName();
        this.teamSeq = mentoring.getTeam().getTeamSeq();
        this.teamType = teamType;
        this.mentoringStartDate = mentoring.getMentoringStartDate();
        this.mentoringStartTime = mentoring.getMentoringStartTime();
        this.mentoringCreateTime = mentoring.getMentoringCreateTime();
        this.mentoringState = mentoring.getMentoringState().name();
    }
}