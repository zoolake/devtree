package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserActivitiesTechCntResponseDto {
    private String techName;
    private String techImage;
    private int techCount;

    public void addTechCount() { this.techCount += 1; }
}
