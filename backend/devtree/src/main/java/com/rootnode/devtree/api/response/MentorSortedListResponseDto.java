package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.Tier;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MentorSortedListResponseDto {
    private Long mentorSeq;
    private String mentorNickname;
    private String mentorCareer;
    private Long mentorExp;
    private Long mentorRank;
    private List<MentorTechInfoDto> mentorTechList;
    private Tier tier;
    public MentorSortedListResponseDto(Mentor mentor, Long mentorRank, Tier tier,List<MentorTechInfoDto> mentorTechList) {
        this.mentorSeq = mentor.getMentorSeq();
        this.mentorNickname = mentor.getUser().getUserNickname();
        this.mentorTechList = mentorTechList;
        this.mentorCareer = mentor.getMentorCareer();
        this.mentorExp = mentor.getMentorExp();
        this.mentorRank = mentorRank;
        this.tier = tier;
    }
}
