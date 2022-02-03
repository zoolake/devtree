package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.api.request.ProjectJoinRequestDto;
import com.rootnode.devtree.api.response.CommonResponseDto;
import com.rootnode.devtree.api.response.ProjectCreateResponseDto;
import com.rootnode.devtree.api.response.ProjectDetailResponseDto;
import com.rootnode.devtree.api.response.ProjectListResponseDto;
import com.rootnode.devtree.api.service.TeamService;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProjectApiController {
    private final TeamService teamService;

    /**
     * 기능: 프로젝트 생성
     */
    @PostMapping("/v1/project")
    public ResponseEntity<ProjectCreateResponseDto> projectCreate(@RequestBody ProjectCreateRequestDto requestDto) {

        ProjectCreateResponseDto responseDto = new ProjectCreateResponseDto(teamService.save(requestDto));

        return ResponseEntity
                .status(201)
                .body(responseDto);
    }

    /**
     * 기능: 프로젝트 리스트 조회
     */
    @GetMapping("/v1/project")
    public ResponseEntity<Result> projectList() {
        List<ProjectListResponseDto> responseDto = teamService.findTeams(TeamType.PROJECT);
        return ResponseEntity
                .status(200)
                .body(new Result(responseDto));
    }

    /**
     * 기능: 프로젝트 상세 조회
     */
    @GetMapping("/v1/project/{team_seq}")
    public ResponseEntity<Result> projectDetail(@PathVariable Long team_seq) {
        ProjectDetailResponseDto responseDto = teamService.findProject(team_seq);
        return ResponseEntity
                .status(200)
                .body(new Result(responseDto));
    }

    /**
     * 기능: 프로젝트 신청
     */
    @PostMapping("/v1/project/{team_seq}")
    public ResponseEntity<CommonResponseDto> projectJoin(@PathVariable Long team_seq, @RequestBody ProjectJoinRequestDto requestDto) {
        return ResponseEntity
                .status(201)
                .body(teamService.joinProject(team_seq, requestDto));
    }


    /**
     * List를 한번 감싸서 보내기 위하여 만든 클래스
     */
    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }
}
