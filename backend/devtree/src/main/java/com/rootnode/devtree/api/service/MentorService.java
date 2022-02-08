package com.rootnode.devtree.api.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rootnode.devtree.api.request.MentorScheduleRequestDto;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        List<MentoringReviewDto> reviewDtoList = new ArrayList<>();
        mentoringList.forEach(mentoring -> {
            List<MentoringComment> mentoringCommentList = mentoringCommentRepository.findByMentoringSeq(mentoring.getMentoringSeq());
            List<MentoringCommentInfoDto> mentoringCommentInfoDtoList = mentoringCommentList.stream()
                    .map(mentoringComment -> new MentoringCommentInfoDto(userRepository.getById(mentoringComment.getMentoringUser().getMentoringUserID().getUserSeq()), mentoringComment))
                    .collect(Collectors.toList());

            Team team = mentoring.getTeam();
            List<TechInfoDto> techInfoDtoList = team.getTeamTechList().stream()
                    .map(teamTech -> new TechInfoDto(teamTech.getTech()))
                    .collect(Collectors.toList());

            reviewDtoList.add(new MentoringReviewDto(team.getTeamType(), techInfoDtoList, mentoringCommentInfoDtoList));
        });


        return MentorDetailResponseDto.builder()
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
}
