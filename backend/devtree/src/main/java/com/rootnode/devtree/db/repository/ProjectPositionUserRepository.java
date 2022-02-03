package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPositionUser;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionUserId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectPositionUserRepository extends JpaRepository<ProjectPositionUser, ProjectPositionUserId> {
}
