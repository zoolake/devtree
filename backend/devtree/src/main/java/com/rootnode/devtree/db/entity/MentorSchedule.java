package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_mentor_schedule")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorSchedule {

    @EmbeddedId
    private MentorScheduleId mentorScheduleId;


    @ManyToOne
    @MapsId("mentorSeq")
    @JoinColumn(name = "mentor_seq")
    private Mentor mentor;

}
