package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.ProjectPositionReservation;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectPositionReservationRepository extends JpaRepository<ProjectPositionReservation, ProjectPositionId> {
}
