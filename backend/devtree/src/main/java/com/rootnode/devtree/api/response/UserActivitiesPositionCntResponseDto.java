package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserActivitiesPositionCntResponseDto {
    private String positionName;
    private int positionCount;

    public void addPositionCount() { positionCount += 1; }
}
