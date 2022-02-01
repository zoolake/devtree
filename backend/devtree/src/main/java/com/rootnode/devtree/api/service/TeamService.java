package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamTech;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.ProjectPositionRepository;
import com.rootnode.devtree.db.repository.TeamRepository;
import com.rootnode.devtree.db.repository.TeamTechRepository;
import com.rootnode.devtree.db.repository.TechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamTechRepository teamTechRepository;
    private final ProjectPositionRepository projectPositionRepository;
    private final TechRepository techRepository;


    /**
     * 로직
     * 1. team 테이블에 먼저 삽입 -> team_seq를 얻을 수 있음.
     * 2. 반복문을 통해 team_tech에 (팀 일련번호, 기술 일련번호) 삽입
     * 3. 반복문을 통해 project_position에 (포지션명, 정원) 삽입
     */
    @Transactional
    public Team save(ProjectCreateRequestDto requestDto) {
        Team team = teamRepository.save(requestDto.toTeamEntity());

        requestDto.getTeam_tech().forEach(tech -> {
            teamTechRepository.save(TeamTech.builder()
                    .teamTechID(new TeamTechId(tech, team.getTeam_seq()))
                    .team(team)
                    .tech(techRepository.findById(tech).get())
                    .build());
        });

        requestDto.getTeam_position().forEach(positionMember -> {
            projectPositionRepository.save(positionMember.toProjectPositionEntity(team));
        });

        return team;
    }
}
