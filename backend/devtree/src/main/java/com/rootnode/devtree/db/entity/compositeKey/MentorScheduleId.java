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
    private Long mentor_day;

    @Column(name ="mentor_time" )
    private LocalDateTime mentor_time;

    private Long mentor_seq;
}
