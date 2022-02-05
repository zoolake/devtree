package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.api.request.ProjectJoinRequestDto;
import com.rootnode.devtree.api.response.CommonResponseDto;
import com.rootnode.devtree.api.response.ProjectDetailResponseDto;
import com.rootnode.devtree.api.response.ProjectListResponseDto;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TeamService {
    private final UserRepository userRepository;

    private final TeamRepository teamRepository;
    private final TeamTechRepository teamTechRepository;
    private final TechRepository techRepository;

    private final PositionRepository positionRepository;
    private final ProjectPositionReservationRepository projectPositionReservationRepository;
    private final ProjectPositionRepository projectPositionRepository;


    /**
     * 수정 필요 : service 레이어에서 DTO를 반환하는 일관적인 구조로 가져가야 할 듯.
     * (현재는 Team 엔티티를 Controller 계층까지 넘기고 있음.)
     * 로직
     * 1. team 테이블에 먼저 삽입 -> team_seq를 얻을 수 있음.
     * 2. 반복문을 통해 team_tech에 (팀 일련번호, 기술 일련번호) 삽입
     * 3. 반복문을 통해 project_position에 (포지션명, 정원) 삽입
     */
    @Transactional
    public Team save(ProjectCreateRequestDto requestDto) {
        Team team = teamRepository.save(requestDto.toEntity());

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
     * Parameter로 team_type을 받아와서 해당 스터디 or 프로젝트를 조회하는 방식으로 진행
     */
    @Transactional(readOnly = true)
    public List<ProjectListResponseDto> findTeams(TeamType teamType) {
        // 1. team_type 기반으로 목록 조회 진행
        List<Team> teamList = teamRepository.findAllByTeamType(teamType);

        // 2. 얻어온 목록들을 기반으로 userRepository 에서 관리자 명을 찾아서 Dto로 만들고 반환해주는 방식
        return teamList.stream()
                .map(team -> {
                    String managerName = userRepository.findById(team.getTeam_manager_seq()).get().getUserName();
                    return new ProjectListResponseDto(team, managerName);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponseDto findProject(Long team_seq) {
        // 1. 팀 테이블을 조회
        Team team = teamRepository.findTeamByTeamSeq(team_seq);
        // 2. team_seq를 활용하여 포지션 현황 조회
        List<ProjectPosition> projectPositions = projectPositionRepository.findByTeamSeq(team_seq);

        // 3. (1)에서 얻어온 team_manager_seq를 활용하여 관리자 이름 조회 (user 파트 완성 후 작업하기.)
        String managerName = userRepository.findById(team.getTeam_manager_seq()).get().getUserName();

        // 4. DTO로 변환하여 반환 (userRepository 완성되면 바로 아래 주석 처리한 코드로 사용)
        return new ProjectDetailResponseDto(team, managerName, projectPositions);
    }

    public CommonResponseDto joinProject(Long team_seq, ProjectJoinRequestDto requestDto) {
        Long user_seq = requestDto.getUser_seq();
        String detail_position_name = requestDto.getDetail_position_name();

        // 1. User 객체를 찾는다.
        User user = userRepository.findById(user_seq).get();
        // 2. ProjectPosition 객체를 찾는다.
        ProjectPosition projectPosition = projectPositionRepository.findById(new ProjectPositionId(team_seq, detail_position_name)).get();
        // 3. 저장
        projectPositionReservationRepository.save(requestDto.toEntity(team_seq, user, projectPosition));

        return new CommonResponseDto(201, "프로젝트 참여 요청에 성공하였습니다.");
    }
}
