package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.MentorSchedule;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface MentorScheduleRepository extends JpaRepository<MentorSchedule, MentorScheduleId> {

    @Query(value = "select m.mentorScheduleId.mentorTime from MentorSchedule m where m.mentorScheduleId.mentorSeq = :mentorSeq")
    List<LocalDateTime> findByMentorSeq(Long mentorSeq);
}
