package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.MentorSchedule;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface MentorScheduleRepository extends JpaRepository<MentorSchedule, MentorScheduleId> {

    @Query(value = "select m.mentorScheduleId.mentorTime from MentorSchedule m where m.mentorScheduleId.mentorSeq = :mentorSeq")
    List<LocalTime> findByMentorSeq(Long mentorSeq);

    @Query(value = "select m.mentorScheduleId.mentorTime from MentorSchedule m where m.mentorScheduleId.mentorSeq = :mentorSeq and m.mentorScheduleId.mentorDate = :selectedDate")
    List<LocalTime> findByMentorSeqAndDate(Long mentorSeq, LocalDate selectedDate);

    @Query(value = "select m.mentorScheduleId from MentorSchedule m where m.mentorScheduleId.mentorSeq = :mentorSeq and m.mentorScheduleId.mentorDate >= :currentDate")
    List<MentorScheduleId> findAfterNowByMentorSeq(Long mentorSeq, LocalDate currentDate);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from MentorSchedule s where s.mentorScheduleId.mentorDate = :mentoringDate and s.mentorScheduleId.mentorTime = :mentoringTime")
    void deleteByDateAndTime(LocalDate mentoringDate, LocalTime mentoringTime);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from MentorSchedule s where s.mentor.mentorSeq = :mentorSeq and s.mentorScheduleId.mentorDate = :mentorDate")
    void deleteByMentorSeqAndDate(Long mentorSeq, LocalDate mentorDate);
}
