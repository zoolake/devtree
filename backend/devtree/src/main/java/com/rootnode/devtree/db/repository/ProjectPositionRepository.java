package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectPositionRepository extends JpaRepository<ProjectPosition, ProjectPositionId> {
    @Query(value = "select p from ProjectPosition p where p.projectPositionID.team_seq = :team_seq")
    List<ProjectPosition> findByTeamSeq(Long team_seq);
}
