package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.MentorScheduleRequestDto;
import com.rootnode.devtree.api.request.MentoringApplyRequestDto;
import com.rootnode.devtree.api.request.MentoringAvailableTimeRequestDto;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MentorService {
    private final MentorRepository mentorRepository;
    private final UserRepository userRepository;
    private final MentorTechRepository mentorTechRepository;
    private final MentoringRepository mentoringRepository;
    private final MentoringCommentRepository mentoringCommentRepository;
    private final MentorScheduleRepository mentorScheduleRepository;
    private final TeamRepository teamRepository;

    public Page<MentorListResponseDto> findMentors(Pageable pageable) {
        Page<Mentor> mentors = mentorRepository.findAllWithPagination(pageable);
        return new PageImpl(mentors.stream()
                .map(mentor -> {
                    List<MentorTechInfoDto> mentorTechInfoDtoList =
                            mentorTechRepository.findByMentorTechIdMentorSeq(mentor.getMentorSeq()).stream()
                                    .map(mentorTech -> new MentorTechInfoDto(mentorTech))
                                    .collect(Collectors.toList());

                    return new MentorListResponseDto(mentor, mentorTechInfoDtoList);
                })
                .collect(Collectors.toList()));
    }


    public MentorDetailResponseDto findMentor(Long mentorSeq) {
        // 1. mentor 찾기
        Mentor mentor = mentorRepository.findById(mentorSeq).get();

        // 2. user를 통해 mentor nickname + email 찾기
        User user = userRepository.findById(mentorSeq).get();

        // 3. 멘토 기술 스택을 찾기
        List<MentorTechInfoDto> mentorTechInfoDtoList = mentorTechRepository.findByMentorTechIdMentorSeq(mentorSeq).stream()
                .map(mentorTech -> new MentorTechInfoDto(mentorTech))
                .collect(Collectors.toList());

        // 4. 멘토링 이력 찾기 (각 기술스택 별로 카운트) -> 리스트로 조회(팀이랑 그 팀의 기술스택, 멘토링 시간 순 정렬)
        List<Mentoring> mentoringList = mentoringRepository.findByMentorMentorSeqAndMentoringState(mentorSeq, MentoringState.FINISH);

        List<MentoringInfoDto> mentoringInfoList = new ArrayList<>();
        mentoringList.forEach(mentoring -> {
            Team team = mentoring.getTeam();
            List<TeamTech> teamTechList = team.getTeamTechList();
            LocalDateTime mentoringStartTime = mentoring.getMentoringStartTime();

            List<String> techNameList = teamTechList.stream()
                    .map(teamTech -> {
                        return teamTech.getTech().getTechName();
                    })
                    .collect(Collectors.toList());

            mentoringInfoList.add(new MentoringInfoDto(team.getTeamName(), techNameList, mentoringStartTime));
        });

        // 5. 멘토링 후기 찾기
        List<MentoringCommentInfoDto> reviewDtoList = new ArrayList<>();
        mentoringList.forEach(mentoring -> {
            Long mentoringSeq = mentoring.getMentoringSeq();

            List<MentoringComment> mentoringCommentList = mentoringCommentRepository.findByMentoringSeq(mentoringSeq);
            mentoringCommentList.forEach(mentoringComment -> {
                reviewDtoList.add(new MentoringCommentInfoDto(userRepository.findById(mentoringComment.getMentoringUser().getUser().getUserSeq()).get(), mentoringComment));
            });

        });

        return MentorDetailResponseDto.builder()
                .mentorCareer(mentor.getMentorCareer())
                .mentorDesc(mentor.getMentorDesc())
                .mentorEmail(user.getUserEmail())
                .mentorNickname(user.getUserNickname())
                .mentorTechList(mentorTechInfoDtoList)
                .mentoringInfoList(mentoringInfoList)
                .mentoringReviewList(reviewDtoList)
                .build();
    }

    public CommonResponseDto changeSchedule(Long mentorSeq, List<MentorScheduleRequestDto> requestDtos) {
        Mentor mentor = mentorRepository.findById(mentorSeq).get();

        mentorScheduleRepository.saveAll(requestDtos.stream()
                .map(requestDto -> requestDto.toEntity(mentor))
                .collect(Collectors.toList()));

        return new CommonResponseDto(201, "스케줄 설정에 성공하였습니다.");
    }

    // 멘토링 가능 스케줄 조회
    public List<MentoringAvailableTimeResponseDto> findAvailableTime(Long mentorSeq, MentoringAvailableTimeRequestDto requestDto) {
        List<MentorSchedule> availableTimeList = mentorScheduleRepository.findByMentorSeq(mentorSeq);
        List<MentoringAvailableTimeResponseDto> timeList = new ArrayList<>();
        availableTimeList.forEach(t -> {
            LocalDateTime time = t.getMentorScheduleId().getMentorTime();
            // 멘토 스케줄 테이블에서 가져오는 날짜
            String availableTime = time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            // 해당 날짜의 가능 스케줄을 서치하기 위해 가져온 날짜 정보
            String mentorTime = requestDto.getMentorTime();

            if (availableTime.equals(mentorTime)) {
                timeList.add(new MentoringAvailableTimeResponseDto(time));
            }
        });
        return timeList.stream().sorted(Comparator.comparing(MentoringAvailableTimeResponseDto::getHhmmTime)).collect(Collectors.toList());
    }

    public CommonResponseDto applyMentoring(MentoringApplyRequestDto requestDto) {
        Team team = teamRepository.findById(requestDto.getTeamSeq()).get();
        Mentor mentor = mentorRepository.findById(requestDto.getMentorSeq()).get();
        Mentoring mentoring = mentoringRepository.save(requestDto.toEntity(team, mentor));
        return new CommonResponseDto(201, "멘토링 신청을 완료하였습니다.");
    }
}
