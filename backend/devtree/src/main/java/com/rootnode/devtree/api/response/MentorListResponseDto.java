package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.MentorTech;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MentorListResponseDto {
    private Long mentorSeq;
    private String mentorName;
    private String mentorCareer;
    private Long mentorExp;
    private List<MentorTechInfoDto> mentorTechList;

    public MentorListResponseDto(Mentor mentor, List<MentorTechInfoDto> mentorTechList) {
        this.mentorSeq = mentor.getMentorSeq();
        this.mentorName = mentor.getUser().getUserName();
        this.mentorTechList = mentorTechList;
        this.mentorCareer = mentor.getMentorCareer();
        this.mentorExp = mentor.getMentorExp();
    }
}
