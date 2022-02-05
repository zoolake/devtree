package com.rootnode.devtree.db.entity.compositeKey;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserTechId implements Serializable {

    /**
     * jparepository사용을 위해 네이밍을 바꿈
     *
     */
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "tech_seq")
    private Long techSeq;

}
