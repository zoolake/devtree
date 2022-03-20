//package com.rootnode.devtree.api.controller;
//
//import com.rootnode.devtree.api.request.PositionMember;
//import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
//import com.rootnode.devtree.api.request.ProjectUpdateRequestDto;
//import com.rootnode.devtree.api.response.CommonResponseDto;
//import com.rootnode.devtree.api.response.ProjectCreateResponseDto;
//import com.rootnode.devtree.db.entity.Position;
//import com.rootnode.devtree.db.entity.Team;
//import com.rootnode.devtree.db.entity.TeamState;
//import com.rootnode.devtree.db.entity.TeamTech;
//import com.rootnode.devtree.db.repository.TeamRepository;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.parameters.P;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//class ProjectApiControllerTest {
//
//    @LocalServerPort
//    private int port;
//
//    @Autowired
//    private TestRestTemplate restTemplate;
//
//    @Autowired
//    private TeamRepository teamRepository;
//
//    @AfterEach
//    public void tearDown() {
//        teamRepository.deleteAll();
//    }
//
//    @Test
//    void 프로젝트_생성() {
//        // given
//        Long team_manager_seq = 1L;
//        String team_desc = "팀 설명입니다.";
//        String team_name = "루트노드";
//        TeamState team_state = TeamState.valueOf("RECRUIT");
//
//        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
//                .team_manager_seq(team_manager_seq)
//                .team_desc(team_desc)
//                .team_name(team_name)
//                .team_state(team_state)
//                .build();
//
//        String url = "http://localhost:" + port + "/v1/project";
//        // when
//        ResponseEntity<ProjectCreateResponseDto> responseEntity = restTemplate.postForEntity(url, requestDto, ProjectCreateResponseDto.class);
//        // then
//        assertThat(responseEntity.getBody().getTeam_seq()).isGreaterThan(0L);                 // 팀 일련번호 확인
//
//        List<Team> all = teamRepository.findAll();
//        assertThat(all.get(0).getTeam_name()).isEqualTo("루트노드");             // 팀명 확인
//    }
//
//    @Test
//    void 프로젝트_수정() {
//        // given
//        String team_desc = "팀 소개 수정본입니다.";
//        String team_name = "팀이름변경";
//        List<PositionMember> positionMembers = new ArrayList<>();
//
//        Position position = new Position("장고", "백엔드");
//
//        positionMembers.add(new PositionMember(new Position("뷰", "프론트엔드"), 1));
//        positionMembers.add(new PositionMember(new Position("스프링", "백엔드"), 2));
//        positionMembers.add(new PositionMember(new Position("장고", "백엔드"),3));
//
//        List<Long> team_tech = new ArrayList<>();
//        team_tech.add(1L);
//
//        ProjectUpdateRequestDto requestDto = ProjectUpdateRequestDto.builder()
//                .team_desc(team_desc)
//                .team_name(team_name)
//                .team_position(positionMembers)
//                .team_tech(team_tech)
//                .build();
//
//        String url = "http://localhost:" + port + "/v1/project/1";
//
//        // when
//        CommonResponseDto commonResponseDto = restTemplate.postForObject(url, requestDto, CommonResponseDto.class);
//
//        // then
//        assertThat(commonResponseDto.getStatus()).isEqualTo(201);
//    }
//}