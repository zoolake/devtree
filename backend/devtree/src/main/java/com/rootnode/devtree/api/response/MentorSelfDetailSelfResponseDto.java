package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor @AllArgsConstructor
public class MentorSelfDetailSelfResponseDto {
    private String mentorName;
    private String mentorNickname;
    private String mentorCareer;
    private String mentorDesc;
    private String mentorEmail;
    private List<MentorTechInfoDto> mentorTechList;

//    private List<LocalDateTime> mentoringAvailableTimeList;
    private List<MentoringInfoDto> mentoringInfoList;
    private List<MentoringCommentInfoDto> mentoringReviewList;
}
