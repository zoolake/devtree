package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.ProjectCreateRequestDto;
import com.rootnode.devtree.api.response.ProjectCreateResponseDto;
import com.rootnode.devtree.api.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProjectApiController {
    private final TeamService teamService;

    @PostMapping("/v1/project")
    public ResponseEntity<ProjectCreateResponseDto> projectCreate(@RequestBody ProjectCreateRequestDto requestDto) {

        ProjectCreateResponseDto responseDto = new ProjectCreateResponseDto(teamService.save(requestDto));

        return ResponseEntity
                .status(201)
                .body(responseDto);
    }
}
