package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.*;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.api.service.ProjectService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProjectApiController {
    private final ProjectService projectService;

    /**
     * 기능: 프로젝트 생성
     */
    @PostMapping("/v1/project")
    public ResponseEntity<ProjectCreateResponseDto> projectCreate(Authentication authentication,
                                                                  @RequestBody ProjectCreateRequestDto requestDto) {
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        Long teamManagerSeq = userDetail.getUser().getUserSeq();
        requestDto.setTeamManagerSeq(teamManagerSeq);
        ProjectCreateResponseDto responseDto = new ProjectCreateResponseDto(projectService.save(requestDto));

        return ResponseEntity
                .status(201)
                .body(responseDto);
    }

    /**
     * 기능: 프로젝트 리스트 조회
     */
    @GetMapping("/v1/project")
    public ResponseEntity<Result> projectList() {
        System.out.println(
                "hi"
        );
        List<ProjectListResponseDto> responseDto = projectService.findTeams(TeamType.PROJECT);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("프로젝트 목록 조회에 성공하였습니다.")
                        .build());
    }

    /**
     * 기능: 프로젝트 상세 조회
     */
    @GetMapping("/v1/project/{team_seq}")
    public ResponseEntity<Result> projectDetail(@PathVariable Long team_seq) {
        ProjectDetailResponseDto responseDto = projectService.findProject(team_seq);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .build());
    }

    /**
     * 기능: 프로젝트 신청
     */
    @PostMapping("/v1/project/join/{team_seq}")
    public ResponseEntity<CommonResponseDto> projectJoin(Authentication authentication,
                                                         @PathVariable Long teamSeq,
                                                         @RequestBody ProjectJoinRequestDto requestDto) {
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        Long userSeq = userDetail.getUser().getUserSeq();

        return ResponseEntity
                .status(201)
                .body(projectService.joinProject(userSeq,teamSeq, requestDto));
    }

    /**
     * 기능: 프로젝트 신청 응답
     */
    @PostMapping("/v1/project/join/response/{team_seq}")
    public ResponseEntity<CommonResponseDto> projectJoinResponse(Authentication authentication,
                                                                 @PathVariable Long team_seq,
                                                                 @RequestBody ProjectRespondRequestDto requestDto) {
        UserDetail userDetails = (UserDetail)authentication.getDetails();
        Long user_seq = userDetails.getUser().getUserSeq();
        return ResponseEntity
                .status(201)
                .body(projectService.respondPosition(team_seq, user_seq, requestDto));
    }

    /**
     * 기능: 프로젝트 포지션 조회
     */
    @GetMapping("/v1/project/{team_seq}/position")
    public ResponseEntity<ProjectPositionDetailResponseDto> projectPositionDetail(@PathVariable Long team_seq) {
        return ResponseEntity
                .status(200)
                .body(projectService.findProjectPositionDetail(team_seq));
    }

    /**
     * 기능: 프로젝트 상태 변경 == 팀 상태 변경 == 스터디 상태 변경
     */
    @PutMapping("/v1/team/change/state")
    public ResponseEntity<CommonResponseDto> teamChangeState(@RequestBody ChangeStateRequestDto requestDto) {
        return ResponseEntity
                .status(201)
                .body(projectService.updateTeamState(requestDto.getTeamSeq(), requestDto.getTeamState()));
    }

    /**
     * 기능: 프로젝트 정보 수정
     */
    @PutMapping("/v1/project/{team_seq}")
    public ResponseEntity<CommonResponseDto> projectDetailUpdate(Authentication authentication,
                                                                 @PathVariable Long team_seq,
                                                                 @RequestBody ProjectUpdateRequestDto requestDto) {
        UserDetail userDetails = (UserDetail)authentication.getDetails();
        Long userSeq = userDetails.getUser().getUserSeq();
//      updateProject 안에서 userSeq를 사용하지 않는것 같다.
        return ResponseEntity
                .status(201)
                .body(projectService.updateProject(team_seq, requestDto));
    }

    /**
     * 기능: 프로젝트 신청 조회 (프로젝트 관리 페이지)
     */
    @GetMapping("/v1/project/join/{teamSeq}")
    public ResponseEntity<Result> projectJoinList(@PathVariable Long teamSeq) {
        List<ProjectJoinListResponseDto> responseDto = projectService.findProjectJoinList(teamSeq);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("프로젝트 신청 내역 조회에 성공하였습니다.")
                        .build());
    }

    /**
     * 기능: 프로젝트 삭제
     */
    @DeleteMapping("/v1/project/{teamSeq}")
    public CommonResponseDto projectDelete(@PathVariable Long teamSeq) {
        projectService.deleteProject(teamSeq);
        return new CommonResponseDto(204, "프로젝트 삭제에 성공하였습니다.");
    }


    /**
     * List를 한번 감싸서 보내기 위하여 만든 클래스
     */
    @Data
    @AllArgsConstructor
    @Builder
    static class Result<T> {
        private T data;
        private int status;
        private String message;
    }
}
