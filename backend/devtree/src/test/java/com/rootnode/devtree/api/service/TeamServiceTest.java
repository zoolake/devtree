package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.PositionMember;
import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.api.request.ProjectUpdateRequestDto;
import com.rootnode.devtree.api.response.CommonResponseDto;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.repository.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class TeamServiceTest {
    @Autowired
    ProjectService projectService;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    ProjectPositionRepository projectPositionRepository;

    @Autowired
    PositionRepository positionRepository;

    @Autowired
    TechRepository techRepository;

    @Autowired
    TeamTechRepository teamTechRepository;

    @AfterEach
    public void cleanUp() {
        System.out.println("TEST FINISH AND CLEAN UP");
//        teamRepository.deleteAll();
    }

    @BeforeEach
    void setUp() {
//        Position position1 = new Position("리액트", "프론트엔드");
//        Position position2 = new Position("뷰", "프론트엔드");
//        positionRepository.save(position1);
//        positionRepository.save(position2);
//
//
//        Tech tech1 = Tech.builder().tech_name("스프링").tech_image("images/spring").build();
//        Tech tech2 = Tech.builder().tech_name("도커").tech_image("images/docker").build();
//        techRepository.save(tech1);
//        techRepository.save(tech2);
    }

    @Test
//    @Transactional
    void 프로젝트_생성() {
        // given
        Team save = getTeam();

        // then
        assertThat(save.getTeam_seq()).isGreaterThan(0L);

        // 팀 생성 검사
        List<Team> teams = teamRepository.findAll();
        assertThat(teams.get(0).getTeam_name()).isEqualTo("루트노드");
        assertThat(teams.get(0).getTeam_state()).isEqualTo(TeamState.RECRUIT);

        // 프로젝트 포지션 검사
        List<ProjectPosition> projectPositions = projectPositionRepository.findAll();
        assertThat(projectPositions.get(0).getPosition().getDetail_position_name()).isEqualTo("리액트");
        assertThat(projectPositions.get(0).getPosition_recruit_cnt()).isEqualTo(3);
        assertThat(projectPositions.get(1).getPosition().getDetail_position_name()).isEqualTo("뷰");
        assertThat(projectPositions.get(1).getPosition_recruit_cnt()).isEqualTo(2);

        // 팀 기술스택 검사
        List<TeamTech> teamTechs = teamTechRepository.findAll();
        assertThat(teamTechs.size()).isEqualTo(2);

        // 팀 정원 검사 (포지션 별 모집 인원 총합)
        assertThat(save.getTeam_recruit_cnt()).isEqualTo(5);
    }

    private Team getTeam() {
        Long team_manager_seq = 1L;
        String team_desc = "팀 설명입니다.";
        String team_name = "루트노드";
        TeamState team_state = TeamState.valueOf("RECRUIT");
        TeamType team_type = TeamType.valueOf("PROJECT");


        Position position1 = new Position("리액트", "프론트엔드");
        Position position2 = new Position("뷰", "프론트엔드");

        List<PositionMember> team_position = new ArrayList<>();
        team_position.add(new PositionMember(position1,3));
        team_position.add(new PositionMember(position2,2));

        List<Long> team_tech = new ArrayList<>();
        team_tech.add(techRepository.findByTech_name("스프링").getTech_seq());
        team_tech.add(techRepository.findByTech_name("도커").getTech_seq());

        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                .team_manager_seq(team_manager_seq)
                .team_desc(team_desc)
                .team_name(team_name)
                .team_state(team_state)
                .team_type(team_type)
                .team_position(team_position)
                .team_tech(team_tech)
                .build();
        // when
        Team save = projectService.save(requestDto);
        return save;
    }

    @Test
    @Transactional
    void 프로젝트_수정() {

        // given
        String team_desc1 = "팀 소개 수정본입니다.";
        String team_name1 = "팀이름변경";
        List<PositionMember> positionMembers = new ArrayList<>();

        positionMembers.add(new PositionMember(new Position("뷰", "프론트엔드"), 1));
        positionMembers.add(new PositionMember(new Position("스프링", "백엔드"), 2));

        List<Long> team_tech1 = new ArrayList<>();
        team_tech1.add(1L);

        ProjectUpdateRequestDto requestDto1 = ProjectUpdateRequestDto.builder()
                .team_desc(team_desc1)
                .team_name(team_name1)
                .team_position(positionMembers)
                .team_tech(team_tech1)
                .build();

        // when
        CommonResponseDto commonResponseDto = projectService.updateProject(6L, requestDto1);

        // then
        assertThat(teamRepository.findById(6L).get().getTeam_name()).isEqualTo("팀이름변경");
        List<ProjectPosition> all = projectPositionRepository.findByTeamSeq(6L);
        all.stream().forEach(projectPosition -> {
            System.out.println(projectPosition.getPosition().getDetail_position_name() + " " + projectPosition.getPosition_recruit_cnt());
        });
        assertThat(teamRepository.findById(6L).get().getTeam_recruit_cnt()).isEqualTo(5);
        assertThat(commonResponseDto.getStatus()).isEqualTo(201);
    }
}