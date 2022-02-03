package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPositionReservation;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionReservationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface ProjectPositionReservationRepository extends JpaRepository<ProjectPositionReservation, ProjectPositionReservationId> {
    @Transactional
    @Modifying
    @Query(value = "delete from ProjectPositionReservation r where r.projectPositionReservationID.user_seq = :user_seq and r.projectPositionReservationID.projectPositionID.team_seq = :team_seq")
    void deleteAllByUserSeqAndTeamSeq(Long user_seq, Long team_seq);
}
