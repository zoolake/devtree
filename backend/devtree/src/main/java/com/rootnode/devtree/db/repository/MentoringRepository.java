package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MentoringRepository extends JpaRepository<Mentoring, Long> {
    List<Mentoring> findByMentorMentorSeqAndMentoringState(Long mentorSeq, MentoringState mentoringState);

    @Query(value = "select m from Mentoring m where m.mentor.mentorSeq = :mentorSeq")
    List<Mentoring> findByMentorSeq(Long mentorSeq);

	@Query(value = "select m from Mentoring m where m.team.teamSeq = :teamSeq")
    List<Mentoring> findMentoringByTeamSeq(Long teamSeq);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "update Mentoring m set m.mentoringState='ACCEPT' where m.mentoringSeq = :mentoringSeq")
    void acceptMentoring(Long mentoringSeq);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from Mentoring m where m.mentoringSeq = :mentoringSeq")
    void deleteByMentoringSeq(Long mentoringSeq);

    int countByTeamTeamSeqAndMentorMentorSeq(Long TeamSeq, Long mentorSeq);
}
