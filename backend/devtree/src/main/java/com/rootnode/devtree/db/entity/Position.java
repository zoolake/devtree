package com.rootnode.devtree.db.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 2022.01.31 01:26 문준호
 * Position 조회하는 기능 만들어야 한다.
 * 프로젝트 생성시 어떤 포지션이 있는지 조회하기 때문.
 */

@Table(name = "tb_position")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Position {

    @Id
    @Column(name = "detail_position_name")
    private String detailPositionName;

    @Column(name = "position_name")
    private String positionName;
}
