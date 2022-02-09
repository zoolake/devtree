package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentoringApplyRequestDto {
    private Long mentorSeq;
    private Long teamSeq;
    private int selectedDay;
    private LocalDateTime selectedTime;

    public Mentoring toEntity(Team team, Mentor mentor) {
        return Mentoring.builder()
                .team(team)
                .mentor(mentor)
                .mentoringStartDay(selectedDay)
                .mentoringStartTime(selectedTime)
                .mentoringCreateTime(LocalDateTime.now())
                .mentoringState(MentoringState.WAIT)
                .build();
    }
}