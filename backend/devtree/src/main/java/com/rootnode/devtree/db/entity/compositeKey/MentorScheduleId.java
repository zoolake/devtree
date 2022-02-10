package com.rootnode.devtree.db.entity.compositeKey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor @AllArgsConstructor
@Embeddable
public class MentorScheduleId implements Serializable {

    // 2022-02-10
    @Column(name = "mentor_date")
    private LocalDate mentorDate;      // 원래 Long으로 되어있었음 (day -> date)

    // 14:00:00
    @Column(name ="mentor_time" )
    private LocalTime mentorTime;   // 원래 LocalDateTime으로 되어있었음

    @Column(name = "mentor_seq")
    private Long mentorSeq;
}
