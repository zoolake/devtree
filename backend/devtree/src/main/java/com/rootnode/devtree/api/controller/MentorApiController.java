package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.request.*;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.api.service.MentorService;
import com.rootnode.devtree.common.auth.UserDetail;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
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
    @GetMapping("/v1/user/mentor")
    public ResponseEntity<Result> mentorSelfDetail(Authentication authentication) {
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        User user = userDetail.getUser();
        if(UserRole.MENTOR.equals(user.getUserRole())) {
            MentorSelfDetailSelfResponseDto responseDto = mentorService.findMentorSelf(user.getUserSeq());
            return ResponseEntity
                    .status(200)
                    .body(new Result(responseDto, 200, "멘토 프로필 조회에 성공하였습니다."));
        }
        else return ResponseEntity
                .status(200)
                .body(new Result(null, 200, "멘토 프로필 조회에 성공하였습니다."));
    }

    /**
     * 기능 : 멘토 정보 수정
     */
    @PutMapping("/v1/mentor")
    public CommonResponseDto mentorUpdate(Authentication authentication,
                                          @RequestBody MentorUpdateRequestDto requestDto){
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        Long mentorSeq = userDetail.getUser().getUserSeq();
        return mentorService.updateMentor(mentorSeq, requestDto);
    }

    /**
     * 기능: 멘토 가능 스케줄 설정
     */
    @PutMapping("/v1/mentor/schedule/available")
    public CommonResponseDto mentorSchedule(Authentication authentication,
                                            @RequestBody MentorScheduleRequestDto requestDto) {
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        Long mentorSeq = userDetail.getUser().getUserSeq();
        return mentorService.changeSchedule(mentorSeq, requestDto);
    }

    /**
     * 기능: 멘토링 가능 스케줄 조회
     */
    @PostMapping("/v1/mentoring/schedule/{mentorSeq}")
    public ResponseEntity<Result> mentorAvailableSchedule(@PathVariable Long mentorSeq,
                                                          @RequestBody MentoringAvailableTimeRequestDto requestDto) {
        List<LocalTime> responseDto = mentorService.findAvailableTime(mentorSeq, requestDto);
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

    /**
     * 기능: 멘토링 신청 조회 (멘토)
     */
    @GetMapping("/v1/mentoring/apply")
    public ResponseEntity<Result> mentoringApplyList(Authentication authentication) {
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        Long mentorSeq = userDetail.getUser().getUserSeq();
        List<MentoringApplyListResponseDto> responseDto = mentorService.findMentoringApplyList(mentorSeq);
        return ResponseEntity
                .status(200)
                .body(Result.builder()
                        .data(responseDto)
                        .status(200)
                        .message("멘토링 신청목록 조회 완료")
                        .build());
    }

    /**
     * 기능: 멘토링 신청 응답
     */
    @PostMapping("/v1/mentoring/apply/{mentoringSeq}")
    public CommonResponseDto mentoringApplyResponse(Authentication authentication,
                                                    @PathVariable Long mentoringSeq,
                                                    @RequestBody MentoringApplyRespondRequestDto requestDto) {
        UserDetail userDetail = (UserDetail)authentication.getDetails();
        Long mentorSeq = userDetail.getUser().getUserSeq();
        return mentorService.respondMentoring(mentorSeq, mentoringSeq, requestDto);
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
