package com.rootnode.devtree.api.request;

import com.rootnode.devtree.api.response.MentorTechInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorUpdateRequestDto {
    private String mentorNickName;
    private String mentorCareer;
    private String mentorDesc;
    private String mentorEmail;
    private List<Long> mentorTech;
}
