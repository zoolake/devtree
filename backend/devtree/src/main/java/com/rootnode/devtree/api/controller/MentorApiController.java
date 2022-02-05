package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.response.MentorListResponseDto;
import com.rootnode.devtree.api.service.MentorService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MentorApiController {
    private final MentorService mentorService;

    /**
     * 기능: 멘토 목록 조회
     */
    @GetMapping("/v1/mentor")
    public ResponseEntity<Result> mentorList(Pageable pageable) {
        Page<MentorListResponseDto> mentors = mentorService.findMentors(pageable);
        return ResponseEntity
                .status(200)
                .body(new Result(mentors, 200, "멘토 목록 조회에 성공하였습니다."));
    }

    @Data
    @AllArgsConstructor
    @Builder
    static class Result<T> {
        private T data;
        private int status;
        private String message;
    }
}
