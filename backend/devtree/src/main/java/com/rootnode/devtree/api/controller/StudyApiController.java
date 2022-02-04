package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.StudyCreateRequestDto;
import com.rootnode.devtree.api.response.StudyCreateResponseDto;
import com.rootnode.devtree.api.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
     * 기능 : 스터디 수정
     */

    /**
     * 기능 : 스터디 조회
     */

    /**
     * 기능 : 스터디 삭제
     */
}
