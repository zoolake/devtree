package com.rootnode.devtree.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.MentorSchedule;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorScheduleRequestDto {
    private int mentorDay;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime mentorTime;

    public MentorSchedule toEntity(Mentor mentor) {
        return new MentorSchedule(
                new MentorScheduleId(this.mentorDay, this.mentorTime, mentor.getMentorSeq()), mentor);
    }

}
