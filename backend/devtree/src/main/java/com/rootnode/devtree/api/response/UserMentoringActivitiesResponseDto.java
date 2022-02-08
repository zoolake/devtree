package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserMentoringActivitiesResponseDto {
    private Long mentorSeq;
    private String mentorName;
    private Long teamSeq;
    private TeamType teamType;
    private LocalDateTime mentoringStartTime;
    private int mentoringStartDay;
    private LocalDateTime mentoringCreateTime;
    private String mentoringState;

    public UserMentoringActivitiesResponseDto(Mentoring mentoring, TeamType teamType) {
        this.mentorSeq = mentoring.getMentor().getMentorSeq();
        this.mentorName = mentoring.getMentor().getUser().getUserName();
        this.teamSeq = mentoring.getTeam().getTeamSeq();
        this.teamType = teamType;
        this.mentoringStartTime = mentoring.getMentoringStartTime();
        this.mentoringStartDay = mentoring.getMentoringStartDay();
        this.mentoringCreateTime = mentoring.getMentoringCreateTime();
        this.mentoringState = mentoring.getMentoringState().name();
    }
}
