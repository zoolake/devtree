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
    private List<LocalDateTime> mentorTime;

    public List<MentorSchedule> toEntity(Mentor mentor) {
        List<MentorSchedule> entity = new ArrayList<>();

        this.mentorTime.forEach(localDateTime -> {
            MentorSchedule mentorSchedule = new MentorSchedule(new MentorScheduleId(this.mentorDay, localDateTime, mentor.getMentorSeq()), mentor);
            entity.add(mentorSchedule);
        });
        return entity;
    }

}
