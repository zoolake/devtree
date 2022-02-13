package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.ProjectPosition;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 생성 목적
 * 프로젝트 상세 조회시 프로젝트 포지션 관련 정보를 전달해야 한다.
 * 세부 포지션 명, 정원, 현재원만 필요하기 때문에
 * 별도의 Dto를 생성하여 진행
 */
@Getter
@NoArgsConstructor
public class ProjectPositionInfoDto {
    private String positionName;
    private String detailPositionName;
    private int positionRecruitCnt;
    private int positionMemberCnt;

    public ProjectPositionInfoDto(ProjectPosition projectPosition) {
        this.positionName = projectPosition.getPosition().getPositionName();
        this.detailPositionName = projectPosition.getPosition().getDetailPositionName();
        this.positionRecruitCnt = projectPosition.getPositionRecruitCnt();
        this.positionMemberCnt = projectPosition.getPositionMemberCnt();
    }
}
