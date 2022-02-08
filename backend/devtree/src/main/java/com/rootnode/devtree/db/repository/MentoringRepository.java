package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.MentoringState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MentoringRepository extends JpaRepository<Mentoring, Long> {
    List<Mentoring> findByMentorMentorSeqAndMentoringState(Long mentorSeq, MentoringState mentoringState);

	@Query(value = "select m from Mentoring m where m.team.teamSeq = :teamSeq")
    List<Mentoring> findMentoringByTeamSeq(Long teamSeq);

}
