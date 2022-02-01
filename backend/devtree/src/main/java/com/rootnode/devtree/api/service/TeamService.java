package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.api.response.ProjectDetailResponseDto;
import com.rootnode.devtree.api.response.ProjectListResponseDto;
import com.rootnode.devtree.db.entity.ProjectPosition;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamTech;
import com.rootnode.devtree.db.entity.TeamType;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.ProjectPositionRepository;
import com.rootnode.devtree.db.repository.TeamRepository;
import com.rootnode.devtree.db.repository.TeamTechRepository;
import com.rootnode.devtree.db.repository.TechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamTechRepository teamTechRepository;
    private final ProjectPositionRepository projectPositionRepository;
    private final TechRepository techRepository;


    /**
     * 수정 필요 : service 레이어에서 DTO를 반환하는 일관적인 구조로 가져가야 할 듯.
     *              (현재는 Team 엔티티를 Controller 계층까지 넘기고 있음.)
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

    /**
     * 프로젝트 목록 조회 == 팀 목록 조회 이므로
     * Parameter로 team_type을 받아와서 해당 스터디 or 프로젝트를 조회하는 방식으로 진행해도 될 듯
     */
    @Transactional(readOnly = true)
    public List<ProjectListResponseDto> findTeams(TeamType teamType) {
        List<Team> teamList = teamRepository.findAllByTeamType(teamType);
        return teamList.stream()
                .map(team -> new ProjectListResponseDto(team))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponseDto findProject(Long team_seq) {
        // 1. 팀 테이블을 조회
        Team team = teamRepository.findById(team_seq).get();
        // 2. team_seq를 활용하여 포지션 현황 조회
        List<ProjectPosition> projectPositions = projectPositionRepository.findByTeamSeq(team_seq);

        // 3. (1)에서 얻어온 team_manager_seq를 활용하여 관리자 이름 조회 (user 파트 완성 후 작업하기.)
        // String managerName = userRepository.findById(team_manager_seq);

        // 4. DTO로 변환하여 반환 (userRepository 완성되면 바로 아래 주석 처리한 코드로 사용)
        // return new ProjectDetailResponseDto(team, managerName, projectPositions);
        return new ProjectDetailResponseDto(team, projectPositions);
    }
}
