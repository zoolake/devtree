package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.StudyUser;
import com.rootnode.devtree.db.entity.compositeKey.StudyUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface StudyUserRepository extends JpaRepository<StudyUser, StudyUserId> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from StudyUser s where s.team.teamSeq = :teamSeq")
    void deleteByTeamSeq(Long teamSeq);
}
