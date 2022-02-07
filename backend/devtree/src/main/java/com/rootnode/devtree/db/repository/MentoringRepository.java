package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.MentoringState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentoringRepository extends JpaRepository<Mentoring, Long> {
    List<Mentoring> findByMentorMentorSeqAndAndMentoringState(Long mentorSeq, MentoringState mentoringState);
}
