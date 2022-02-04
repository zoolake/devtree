package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPositionReservation;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionReservationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface ProjectPositionReservationRepository extends JpaRepository<ProjectPositionReservation, ProjectPositionReservationId> {
    @Transactional
    @Modifying
    @Query(value = "delete from ProjectPositionReservation r where r.projectPositionReservationID.userSeq = :user_seq and r.projectPositionReservationID.projectPositionID.teamSeq = :team_seq")
    void deleteAllByUserSeqAndTeamSeq(Long user_seq, Long team_seq);

    @Transactional
    @Modifying
    @Query(value = "delete from ProjectPositionReservation r where r.projectPositionReservationID.projectPositionID.teamSeq = :teamSeq")
    void deleteByTeamSeq(Long teamSeq);

    @Query(value = "select p from ProjectPositionReservation p join fetch p.user join fetch p.projectPosition where p.projectPosition.team.teamSeq = :teamSeq")
    List<ProjectPositionReservation> findAllByTeamSeq(Long teamSeq);
}
