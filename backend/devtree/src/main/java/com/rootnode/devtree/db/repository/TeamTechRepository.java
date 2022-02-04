package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.TeamTech;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface TeamTechRepository extends JpaRepository<TeamTech, TeamTechId> {
    @Transactional
    @Modifying
    @Query(value = "delete from TeamTech t where t.team.team_seq = :teamSeq")
    void deleteByTeamSeq(Long teamSeq);
}
