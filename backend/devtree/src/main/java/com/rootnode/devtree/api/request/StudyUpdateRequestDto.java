package com.rootnode.devtree.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyUpdateRequestDto {
    private Long teamManagerSeq;
    private String teamName;
    private String teamDesc;
    private int teamRecruitCnt;

    private List<Long> teamTech;
}
