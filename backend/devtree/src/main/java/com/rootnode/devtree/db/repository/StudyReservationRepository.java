package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.StudyReservation;
import com.rootnode.devtree.db.entity.compositeKey.StudyReservationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudyReservationRepository extends JpaRepository<StudyReservation, StudyReservationId> {
    @Transactional
    @Modifying
    @Query(value = "delete from StudyReservation r where r.studyReservationID.teamSeq = :teamSeq")
    void deleteByTeamSeq(Long teamSeq);

    @Query(value = "select s from StudyReservation s where s.team.teamSeq = :teamSeq")
    List<StudyReservation> findByTeamSeq(Long teamSeq);
}
