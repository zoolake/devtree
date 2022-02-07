package com.rootnode.devtree.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rootnode.devtree.db.entity.compositeKey.MentorTechId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_mentor_tech")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorTech {

    @EmbeddedId
    private MentorTechId mentorTechId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("techSeq")
    @JoinColumn(name = "tech_seq")
    private Tech tech;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("mentorSeq")
    @JoinColumn(name = "mentor_seq")
    private Mentor mentor;
}
