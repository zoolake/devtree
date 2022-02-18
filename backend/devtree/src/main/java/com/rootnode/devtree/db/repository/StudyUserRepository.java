package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.StudyUser;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.compositeKey.StudyUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudyUserRepository extends JpaRepository<StudyUser, StudyUserId> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from StudyUser s where s.team.teamSeq = :teamSeq")
    void deleteByTeamSeq(Long teamSeq);

    @Query(value = "select s.team.teamSeq from StudyUser s where s.user.userSeq = :userSeq")
    List<Long> findTeamSeqByUserSeq(Long userSeq);

    @Query(value = "select s.user.userSeq from StudyUser s where s.team.teamSeq = :teamSeq")
    List<Long> findUserSeqByTeamSeq(Long teamSeq);

    @Query(value = "select s.user from StudyUser s where s.team.teamSeq = :teamSeq")
    List<User> findUserByTeamSeq(Long teamSeq);
}
