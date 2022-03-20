package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPositionUser;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectPositionUserRepository extends JpaRepository<ProjectPositionUser, ProjectPositionUserId> {
    @Query(value = "select p.projectPositionUserID.projectPositionID.teamSeq from ProjectPositionUser p where p.user.userSeq = :userSeq")
    List<Long> findTeamSeqByUserSeq(Long userSeq);

    @Query(value = "select p.user.userSeq from ProjectPositionUser p where p.projectPosition.team.teamSeq = :teamSeq")
    List<Long> findUserSeqByTeamSeq(Long teamSeq);

    @Query(value = "select p from ProjectPositionUser p where p.projectPosition.team.teamSeq = :teamSeq")
    List<ProjectPositionUser> findUserByTeamSeq(Long teamSeq);
}
