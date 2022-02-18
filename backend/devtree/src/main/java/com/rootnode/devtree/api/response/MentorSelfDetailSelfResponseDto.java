package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Tier;
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
    private Long mentorExp;
    private Tier tier;
    private List<MentorTechInfoDto> mentorTechList;
    private List<MentoringInfoDto> mentoringInfoList;
    private List<MentoringCommentInfoDto> mentoringReviewList;
}
