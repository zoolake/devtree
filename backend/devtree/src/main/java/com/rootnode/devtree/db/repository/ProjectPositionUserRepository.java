package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPositionUser;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectPositionUserRepository extends JpaRepository<ProjectPositionUser, ProjectPositionUserId> {
    @Query(value = "select p.projectPositionUserID.projectPositionID.teamSeq from ProjectPositionUser p where p.user.userSeq = :userSeq")
    List<Long> findTeamSeqByUserSeq(Long userSeq);
}
