package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.api.response.ProjectCreateResponseDto;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamState;
import com.rootnode.devtree.db.repository.TeamRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProjectApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TeamRepository teamRepository;

    @AfterEach
    public void tearDown() {
        teamRepository.deleteAll();
    }

    @Test
    void 프로젝트_생성() {
        // given
        Long team_manager_seq = 1L;
        String team_desc = "팀 설명입니다.";
        String team_name = "루트노드";
        TeamState team_state = TeamState.valueOf("RECRUIT");

        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
                .team_manager_seq(team_manager_seq)
                .team_desc(team_desc)
                .team_name(team_name)
                .team_state(team_state)
                .build();

        String url = "http://localhost:" + port + "/v1/project";
        // when
        ResponseEntity<ProjectCreateResponseDto> responseEntity = restTemplate.postForEntity(url, requestDto, ProjectCreateResponseDto.class);
        // then
        assertThat(responseEntity.getBody().getTeam_seq()).isGreaterThan(0L);                 // 팀 일련번호 확인

        List<Team> all = teamRepository.findAll();
        assertThat(all.get(0).getTeam_name()).isEqualTo("루트노드");             // 팀명 확인
    }
}