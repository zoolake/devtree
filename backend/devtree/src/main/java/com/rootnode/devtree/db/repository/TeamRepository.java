package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
