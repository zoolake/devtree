package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.MentorSchedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorScheduleRequestDto {
    private int mentorDay;
    private LocalTime mentorTime;
}
