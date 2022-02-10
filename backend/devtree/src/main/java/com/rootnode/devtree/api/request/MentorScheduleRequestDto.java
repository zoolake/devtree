package com.rootnode.devtree.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.MentorSchedule;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorScheduleRequestDto {
    private LocalDate mentorDate;
    private List<LocalTime> mentorTime;
}
