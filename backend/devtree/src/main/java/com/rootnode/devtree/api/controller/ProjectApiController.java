package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.api.response.ProjectCreateResponseDto;
import com.rootnode.devtree.api.response.ProjectListResponseDto;
import com.rootnode.devtree.api.service.TeamService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
        List<ProjectListResponseDto> projects = teamService.findProjects();
        return ResponseEntity
                .status(200)
                .body(new Result(projects));
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
