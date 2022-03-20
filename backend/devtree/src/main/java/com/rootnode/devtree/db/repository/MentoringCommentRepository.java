package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.MentoringComment;
import com.rootnode.devtree.db.entity.compositeKey.MentoringCommentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MentoringCommentRepository extends JpaRepository<MentoringComment, MentoringCommentId> {
    @Query(value = "select m from MentoringComment m where m.mentoring.mentoringSeq = :mentoringSeq")
    List<MentoringComment> findByMentoringSeq(Long mentoringSeq);
}
