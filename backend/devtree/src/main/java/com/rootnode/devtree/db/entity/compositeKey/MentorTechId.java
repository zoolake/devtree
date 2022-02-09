package com.rootnode.devtree.db.entity.compositeKey;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class MentorTechId implements Serializable {

    @Column(name = "mentor_seq")
    private Long mentorSeq;

    @Column(name = "tech_seq")
    private Long techSeq;
}
