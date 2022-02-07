package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.MentorTech;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MentorTechInfoDto {
    private Long techSeq;
    private String techName;
    private String techImage;

    public MentorTechInfoDto (MentorTech mentorTech) {
        this.techSeq = mentorTech.getMentorTechId().getTechSeq();
        this.techName = mentorTech.getTech().getTechName();
        this.techImage = mentorTech.getTech().getTechImage();
    }
}
