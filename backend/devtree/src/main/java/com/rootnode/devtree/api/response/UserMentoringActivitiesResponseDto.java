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
    private Long mentoringSeq;
    private Long mentorSeq;
    private String mentorNickName;
    private Long teamSeq;
    private String teamName;
    private TeamType teamType;
    private LocalDate mentoringStartDate;
    private LocalTime mentoringStartTime;
    private LocalDateTime mentoringCreateTime;
    private String mentoringState;
    private String mentoringApplicationComment;

    public UserMentoringActivitiesResponseDto(Mentoring mentoring, TeamType teamType, String teamName) {
        this.mentoringSeq = mentoring.getMentoringSeq();
        this.mentorSeq = mentoring.getMentor().getMentorSeq();
        this.mentorNickName = mentoring.getMentor().getUser().getUserNickname();
        this.teamSeq = mentoring.getTeam().getTeamSeq();
        this.teamName = teamName;
        this.teamType = teamType;
        this.mentoringStartDate = mentoring.getMentoringStartDate();
        this.mentoringStartTime = mentoring.getMentoringStartTime();
        this.mentoringCreateTime = mentoring.getMentoringCreateTime();
        this.mentoringState = mentoring.getMentoringState().name();
        this.mentoringApplicationComment = mentoring.getMentoringApplicationComment();
    }
}