package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor @AllArgsConstructor
public class MentorDetailResponseDto {
    private String mentorNickname;
    private List<MentorTechInfoDto> mentorTechList;
    private String mentorDesc;
    private String mentorEmail;
    private Map<String, MentoringInfoDto> mentoringInfoMap;
    private List<MentoringReviewDto> mentoringReviewList;
}
