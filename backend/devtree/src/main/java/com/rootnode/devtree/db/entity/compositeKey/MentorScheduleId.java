package com.rootnode.devtree.db.entity.compositeKey;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Embeddable
public class MentorScheduleId implements Serializable {

    @Column(name = "mentor_day")
    private Long mentorDay;

    @Column(name ="mentor_time" )
    private LocalDateTime mentorTime;

    @Column(name = "mentor_seq")
    private Long mentorSeq;
}
