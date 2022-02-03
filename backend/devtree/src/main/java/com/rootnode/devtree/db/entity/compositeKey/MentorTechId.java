package com.rootnode.devtree.db.entity.compositeKey;


import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Data
@Embeddable
public class MentorTechId implements Serializable {

    private Long mentor_seq;

    private Long tech_seq;
}
