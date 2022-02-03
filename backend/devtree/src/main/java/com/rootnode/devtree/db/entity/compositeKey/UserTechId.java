package com.rootnode.devtree.db.entity.compositeKey;


import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class UserTechId implements Serializable {

    private Long user_seq;

    private Long tech_seq;
}
