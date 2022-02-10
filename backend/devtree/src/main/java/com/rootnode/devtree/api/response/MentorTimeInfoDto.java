package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class MentorTimeInfoDto {
    private LocalDate mentorDate;
    private List<LocalTime> mentorTime;
}
