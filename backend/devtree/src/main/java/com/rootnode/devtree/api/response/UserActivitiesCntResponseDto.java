package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserActivitiesCntResponseDto {
    private String techName;
    private String techImage;
    private int techCnt;

    public void addTechCount() { this.techCnt += 1; }
}
