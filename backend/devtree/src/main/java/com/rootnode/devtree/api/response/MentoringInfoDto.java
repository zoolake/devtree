package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MentoringInfoDto {
    private String techName;
    private String techImage;
    private int mentoringCount;

    public void addMentoringCount() {
        this.mentoringCount += 1;
    }
}
