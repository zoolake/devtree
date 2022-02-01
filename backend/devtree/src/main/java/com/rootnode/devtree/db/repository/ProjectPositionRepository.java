package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectPositionRepository extends JpaRepository<ProjectPosition, ProjectPositionId> {
}
