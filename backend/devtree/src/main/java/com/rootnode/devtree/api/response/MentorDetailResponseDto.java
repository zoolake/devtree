package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Tier;
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
    private String mentorCareer;
    private List<MentorTechInfoDto> mentorTechList;
    private String mentorDesc;
    private String mentorEmail;
    private Long mentorExp;
    private List<MentoringInfoDto> mentoringInfoList;
    private List<MentoringCommentInfoDto> mentoringReviewList;
    private Tier tier;
}
