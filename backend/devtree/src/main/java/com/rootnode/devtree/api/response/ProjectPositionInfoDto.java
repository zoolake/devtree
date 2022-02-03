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
    private String detail_position_name;
    private int position_recruit_cnt;
    private int position_member_cnt;

    public ProjectPositionInfoDto(ProjectPosition projectPosition) {
        this.detail_position_name = projectPosition.getPosition().getDetail_position_name();
        this.position_recruit_cnt = projectPosition.getPosition_recruit_cnt();
        this.position_member_cnt = projectPosition.getPosition_member_cnt();
    }
}
