package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.StudyCreateRequestDto;
import com.rootnode.devtree.api.response.StudyCreateResponseDto;
import com.rootnode.devtree.api.response.StudyDetailResponseDto;
import com.rootnode.devtree.api.response.StudyListResponseDto;
import com.rootnode.devtree.api.service.StudyService;
import com.rootnode.devtree.db.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
                .body(new Result(responseDto));
    }


    /**
     * 기능 : 스터디 상세 조회
     */
    @GetMapping("/v1/study/{team_seq}")
    public ResponseEntity<Result> studyDetail(@PathVariable Long team_seq) {
        System.out.println("team_seq >>> " + team_seq);
        StudyDetailResponseDto responseDto = studyService.findStudyDetail(team_seq);
        return ResponseEntity
                .status(200)
                .body(new Result(responseDto));
    }


    /**
     * 기능 : 스터디 수정
     */



    /**
     * 기능 : 스터디 삭제
     */

    /**
     * List를 한번 감싸서 보내기 위하여 만든 클래스
     */
    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }
}
