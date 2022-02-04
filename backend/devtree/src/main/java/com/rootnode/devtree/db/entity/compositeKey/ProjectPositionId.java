package com.rootnode.devtree.db.entity.compositeKey;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor
@Embeddable
public class ProjectPositionId implements Serializable {

    @Column(name = "team_seq")
    private Long teamSeq;

    @Column(name = "detail_position_name")
    private String detailPositionName;
}
