package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    @EntityGraph(attributePaths = {"teamTechList","teamTechList.tech"}, type = EntityGraph.EntityGraphType.LOAD)
    @Query(value = "select t from Team t where t.team_type = :teamType")
    List<Team> findAllByTeamType(TeamType teamType);   // 팀 타입 기반으로 목록을 조회할 수 있습니다.
}
