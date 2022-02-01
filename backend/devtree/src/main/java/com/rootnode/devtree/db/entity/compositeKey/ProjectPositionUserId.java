package com.rootnode.devtree.db.entity.compositeKey;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor
@Embeddable
public class ProjectPositionUserId implements Serializable {

    private Long user_seq;
    private ProjectPositionId projectPositionID;
}