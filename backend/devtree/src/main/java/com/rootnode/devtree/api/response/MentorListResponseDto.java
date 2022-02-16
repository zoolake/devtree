package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.MentorTech;
import com.rootnode.devtree.db.entity.Tier;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MentorListResponseDto {
    private Long mentorSeq;
    private String mentorNickname;
    private String mentorCareer;
    private Long mentorExp;
    private List<MentorTechInfoDto> mentorTechList;
    private Tier tier;

    public MentorListResponseDto(Mentor mentor, Tier tier,List<MentorTechInfoDto> mentorTechList) {
        this.mentorSeq = mentor.getMentorSeq();
        this.mentorNickname = mentor.getUser().getUserNickname();
        this.mentorTechList = mentorTechList;
        this.mentorCareer = mentor.getMentorCareer();
        this.mentorExp = mentor.getMentorExp();
        this.tier = tier;
    }
}
