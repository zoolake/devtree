package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Tech;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 생성 목적
 * 프로젝트 조회시 기술스택 관련해서 정보를 전달해야하는데,
 * 기술스택 정보는 "이름"과 "이미지 저장 경로"만 필요하기 때문에
 * 별도의 Dto를 생성하여 관리하려고 한다.
 */
@Getter
@NoArgsConstructor
public class TechInfoDto {
    private Long techSeq;
    private String techName;
    private String techImage;

    public TechInfoDto(Tech tech) {
        this.techSeq = tech.getTechSeq();
        this.techName = tech.getTechName();
        this.techImage = tech.getTechImage();
    }
}
