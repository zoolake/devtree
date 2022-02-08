package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.*;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionReservationId;
import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionUserId;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProjectService {
    private final UserRepository userRepository;

    private final TeamRepository teamRepository;
    private final TeamTechRepository teamTechRepository;
    private final TechRepository techRepository;

    private final PositionRepository positionRepository;
    private final ProjectPositionReservationRepository projectPositionReservationRepository;
    private final ProjectPositionRepository projectPositionRepository;
    private final ProjectPositionUserRepository projectPositionUserRepository;


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

        // 원본
        requestDto.getTeamTech().forEach(tech -> {
            teamTechRepository.save(TeamTech.builder()
                    .teamTechID(new TeamTechId(team.getTeamSeq(), tech))
                    .team(team)
                    .tech(techRepository.findById(tech).get())
                    .build());
        });

        saveProjectPosition(requestDto.getTeamPosition(), team);

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
                    String managerName = userRepository.findById(team.getTeamManagerSeq()).get().getUserName();
                    // 2. team_seq를 활용하여 포지션 현황 조회
                    List<ProjectPosition> projectPositions = projectPositionRepository.findByTeamSeq(team.getTeamSeq());
                    return new ProjectListResponseDto(team, managerName, projectPositions);
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
        String managerName = userRepository.findById(team.getTeamManagerSeq()).get().getUserName();

        // 4. DTO로 변환하여 반환 (userRepository 완성되면 바로 아래 주석 처리한 코드로 사용)
        return new ProjectDetailResponseDto(team, managerName, projectPositions);
    }

    @Transactional
    public CommonResponseDto joinProject(Long team_seq, ProjectJoinRequestDto requestDto) {
        Long user_seq = requestDto.getUserSeq();
        String detail_position_name = requestDto.getDetailPositionName();

        // 1. User 객체를 찾는다.
        User user = userRepository.findById(user_seq).get();
        // 2. ProjectPosition 객체를 찾는다.
        ProjectPosition projectPosition = projectPositionRepository.findById(new ProjectPositionId(team_seq, detail_position_name)).get();
        // 3. 저장
        projectPositionReservationRepository.save(requestDto.toEntity(team_seq, user, projectPosition));

        return new CommonResponseDto(201, "프로젝트 참여 요청에 성공하였습니다.");
    }

    @Transactional
    public CommonResponseDto respondPosition(Long team_seq, Long user_seq, ProjectRespondRequestDto requestDto) {

        String detail_position_name = requestDto.getDetailPositionName();
        ResponseType response_type = requestDto.getResponseType();

        ProjectPositionUserId projectPositionUserId = new ProjectPositionUserId(user_seq, new ProjectPositionId(team_seq, detail_position_name));
        ProjectPosition projectPosition = projectPositionRepository.findById(new ProjectPositionId(team_seq, detail_position_name)).get();
        User user = userRepository.findById(user_seq).get();

        // 1. 수락을 하는 경우
        if (ResponseType.ACCEPT.equals(response_type)) {
            // 1. Project_Position_User_Repository 에 insert (해당 포지션 현재원 1 증가, 해당 팀 현재원 1 증가)
            projectPositionUserRepository.save(new ProjectPositionUser(projectPositionUserId, projectPosition, user));
            projectPosition.addMemberCount();
            teamRepository.findById(team_seq).get().addTeamMember();

            // 2. Project_position_Reservation_Repository 에 있는 (user_seq, team_seq) 데이터를 모두 지워준다.
            projectPositionReservationRepository.deleteAllByUserSeqAndTeamSeq(user_seq, team_seq);
        }

        // 2. 거절을 하는 경우
        if (ResponseType.REJECT.equals(response_type)) {
            // 1. 해당 신청 기록을 Project_Position_Reservation_Repostiory 에서 지워준다.
            projectPositionReservationRepository.deleteById(new ProjectPositionReservationId(user_seq, new ProjectPositionId(team_seq, detail_position_name)));
        }

        return new CommonResponseDto(201, "프로젝트 참여 요청 응답에 성공하였습니다.");
    }


    @Transactional
    public ProjectPositionDetailResponseDto findProjectPositionDetail(Long team_seq) {
        return new ProjectPositionDetailResponseDto(projectPositionRepository.findByTeamSeq(team_seq));
    }

    @Transactional
    public CommonResponseDto updateTeamState(Long team_seq, TeamState team_state) {
        Team team = teamRepository.findById(team_seq).get();
        team.changeTeamState(team_state);
        return new CommonResponseDto(201, "팀 상태 변경에 성공하였습니다.");
    }

    @Transactional
    public CommonResponseDto updateProject(Long team_seq, ProjectUpdateRequestDto requestDto) {
        Team team = teamRepository.findById(team_seq).get();

        if (StringUtils.hasText(requestDto.getTeamName())) {
            team.changeTeamName(requestDto.getTeamName());
        }

        if (StringUtils.hasText(requestDto.getTeamDesc())) {
            team.changeTeamDesc(requestDto.getTeamDesc());
        }

        if (!Objects.isNull(requestDto.getTeamTech())) {
            // 부모쪽 먼저 삭제
            team.getTeamTechList().clear();
            // 자식쪽 삭제
            teamTechRepository.deleteByTeamSeq(team_seq);

            // 새로 삽입
            requestDto.getTeamTech().forEach(techSeq -> {
                teamTechRepository.save(TeamTech.builder()
                        .teamTechID(new TeamTechId(team_seq, techSeq))
                        .team(team)
                        .tech(techRepository.findById(techSeq).get())
                        .build());
            });
        }

        if (!Objects.isNull(requestDto.getTeamPosition())) {
            // 새로 삽입
            List<PositionMember> positionMembers = requestDto.getTeamPosition();

            // 기존 포지션이 인원이 변경되는 경우면 update
            positionMembers.forEach(positionMember -> {
                // 이미 있는 포지션이라면 인원만 update
                if (projectPositionRepository.findById(new ProjectPositionId(team_seq, positionMember.getPosition().getDetailPositionName())).isPresent()) {
                    ProjectPosition projectPosition = projectPositionRepository.findById(new ProjectPositionId(team_seq, positionMember.getPosition().getDetailPositionName())).get();
                    int positionRecruitCnt = positionMember.getPositionRecruitCnt();
                    projectPosition.changeRecruitCount(positionRecruitCnt);
                }
                // 새로운 포지션이 생기면 삽입
                else {
                    projectPositionRepository.save(positionMember.toProjectPositionEntity(team));
                }
            });

            // 팀 총 정원도 변경되기 때문에 수정해준다.
            team.changeTeamRecruitCnt(projectPositionRepository.findAll().stream()
                    .mapToInt(ProjectPosition::getPositionRecruitCnt)
                    .sum());
        }

        return new CommonResponseDto(201, "프로젝트 정보 수정에 성공하였습니다.");
    }

    public List<ProjectJoinListResponseDto> findProjectJoinList(Long teamSeq) {
        List<ProjectPositionReservation> joinList = projectPositionReservationRepository.findAllByTeamSeq(teamSeq);
        return joinList.stream()
                .map(entity -> new ProjectJoinListResponseDto(entity))
                .collect(Collectors.toList());
    }

    public void deleteProject(Long teamSeq) {
        teamRepository.deleteById(teamSeq);
    }

    /**
     * List<포지션 이름, 정원> , 팀을 넘기면 저장해주는 메소드
     */
    private void saveProjectPosition(List<PositionMember> project_position, Team team) {
        project_position.forEach(positionMember -> {
            projectPositionRepository.save(positionMember.toProjectPositionEntity(team));
        });
    }


}
