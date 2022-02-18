package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.*;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.api.service.StudyService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.db.entity.TeamType;
import com.rootnode.devtree.db.entity.User;
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
public class StudyApiController {
    private final StudyService studyService;

    /**
     *  기능 : 스터디 생성
     */
    @PostMapping("/v1/study")
    public ResponseEntity<StudyCreateResponseDto> studyCreate(@RequestBody StudyCreateRequestDto requestDto) {
        StudyCreateResponseDto responseDto = new StudyCreateResponseDto(studyService.save(requestDto));

        return ResponseEntity.status(201).body(responseDto);
    }

    /**
     * 기능 : 스터디 리스트 조회
     */
    @GetMapping("/v1/study")
    public ResponseEntity<Result> studyList() {
        List<StudyListResponseDto> responseDto = studyService.findStudy(TeamType.STUDY);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("스터디 목록 조회에 성공하였습니다.")
                        .build());
    }

    /**
     * 기능 : 스터디 상세 조회
     */
    @GetMapping("/v1/study/{teamSeq}")
    public ResponseEntity<Result> studyDetail(Authentication authentication,
                                              @PathVariable Long teamSeq) {

        StudyDetailResponseDto responseDto = studyService.findStudyDetail(teamSeq);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("스터디 정보 조회에 성공하였습니다.")
                        .build());
    }


    /**
     * 기능 : 스터디 팀 멤버 조회
     */
    @GetMapping("/v1/study/member/{teamSeq}")
    public ResponseEntity<Result> studyMemberList(@PathVariable Long teamSeq) {
        List<StudyMemberListResponseDto> responseDto = studyService.findStudyMember(teamSeq);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("스터디 멤버 조회 성공")
                        .build());
    }



    /**
     * 기능 : 스터디 신청
     */
    @PostMapping("/v1/study/{teamSeq}")
    public ResponseEntity<CommonResponseDto> studyJoin(Authentication authentication,
                                                       @PathVariable Long teamSeq,
                                                       @RequestBody StudyJoinRequestDto requestDto) {
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        Long userSeq = userDetail.getUser().getUserSeq();
        System.out.println("user_seq >>> " + requestDto.getUserSeq());
        return ResponseEntity
                .status(200)
                .body(studyService.joinStudy(userSeq,teamSeq, requestDto));
    }

    /**
     * 기능 : 스터디 신청 조회
     */
    @GetMapping("/v1/study/join/{teamSeq}")
    public ResponseEntity<Result> studyJoinList(@PathVariable Long teamSeq) {
        List<StudyJoinListResponseDto> responseDto = studyService.findStudyJoinList(teamSeq);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("스터디 신청 내역 조회에 성공하였습니다.")
                        .build());
    }

    /**
     * 기능 : 스터디 신청 응답
     */
    @PostMapping("/v1/study/join/{teamSeq}")
    public ResponseEntity<CommonResponseDto> studyJoinResponse(@PathVariable Long teamSeq,
                                                               @RequestBody StudyRespondRequestDto requestDto) {
        return ResponseEntity
                .status(201)
                .body(studyService.respondStudy(teamSeq, requestDto));
    }

    /**
     * 기능 : 팀 관리자 변경
     */
    @PutMapping("/v1/team/change/manager")
    public ResponseEntity<CommonResponseDto> teamManagerChange(@RequestBody ChangeTeamManagerRequestDto requestDto) {
        return ResponseEntity
                .status(201)
                .body(studyService.changeTeamManager(requestDto.getTeamSeq(), requestDto.getUserSeq()));
    }

    /**
     * 기능 : 스터디 정보 수정
     * teamManagerSeq 와 본인의 비교 필요
     */
    @PutMapping("/v1/study/{teamSeq}")
    public ResponseEntity<CommonResponseDto> studyDetailUpdate(@PathVariable Long teamSeq,
                                                               @RequestBody StudyUpdateRequestDto requestDto) {
        return ResponseEntity
                .status(201)
                .body(studyService.updateStudy(teamSeq, requestDto));
    }

    /**
     * 기능 : 스터디 삭제
     */
    @DeleteMapping("/v1/study/{teamSeq}")
    public ResponseEntity<CommonResponseDto> studyDelete(@PathVariable Long teamSeq) {
        return ResponseEntity
                .status(204)
                .body(studyService.deleteStudy(teamSeq));
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
