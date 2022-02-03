package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.TeamTech;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamTechRepository extends JpaRepository<TeamTech, TeamTechId> {
}
