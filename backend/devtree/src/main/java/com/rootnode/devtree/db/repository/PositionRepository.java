package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, String> {
}
