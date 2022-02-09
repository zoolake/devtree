package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.MentorScheduleRequestDto;
import com.rootnode.devtree.api.request.MentoringApplyRequestDto;
import com.rootnode.devtree.api.request.MentoringAvailableTimeRequestDto;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.api.service.MentorService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Page<MentorListResponseDto> responseDto = mentorService.findMentors(pageable);
        return ResponseEntity
                .status(200)
                .body(new Result(responseDto, 200, "멘토 목록 조회에 성공하였습니다."));
    }

    /**
     * 기능: 멘토 프로필 조회 (남이 보는)
     */

    @GetMapping("/v1/mentor/{mentorSeq}")
    public ResponseEntity<Result> mentorDetail(@PathVariable Long mentorSeq) {
        MentorDetailResponseDto responseDto = mentorService.findMentor(mentorSeq);
        return ResponseEntity
                .status(200)
                .body(new Result(responseDto, 200, "멘토 프로필 조회에 성공하였습니다."));
    }

    /**
     * 기능: 멘토 프로필 조회 (자신이 보는)
     */
    @GetMapping("/v1/user/mentor/{mentorSeq}")
    public ResponseEntity<Result> mentorSelfDetail(@PathVariable Long mentorSeq) {
        MentorSelfDetailSelfResponseDto responseDto = mentorService.findMentorSelf(mentorSeq);
        return ResponseEntity
                .status(200)
                .body(new Result(responseDto, 200, "멘토 프로필 조회에 성공하였습니다."));
    }

    /**
     * 기능: 멘토 가능 스케줄 설정
     */
    @PutMapping("/v1/mentor/{mentorSeq}/available")
    public CommonResponseDto mentorSchedule(@PathVariable Long mentorSeq,
                                            @RequestBody List<MentorScheduleRequestDto> requestDto) {
        return mentorService.changeSchedule(mentorSeq, requestDto);
    }

    /**
     * 기능: 멘토링 가능 스케줄 조회
     */
    @PostMapping("/v1/mentoring/{mentorSeq}")
    public ResponseEntity<Result> mentorAvailableSchedule(@PathVariable Long mentorSeq, @RequestBody MentoringAvailableTimeRequestDto requestDto) {
        List<MentoringAvailableTimeResponseDto> responseDto = mentorService.findAvailableTime(mentorSeq, requestDto);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("멘토 스케줄 조회 완료")
                        .build());
    }

    /**
     * 기능: 멘토링 신청
     */
    @PostMapping("/v1/mentoring/apply")
    public CommonResponseDto mentoringApply(@RequestBody MentoringApplyRequestDto requestDto) {
        return mentorService.applyMentoring(requestDto);
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
