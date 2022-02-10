package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.*;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import com.rootnode.devtree.db.entity.compositeKey.MentorTechId;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    private final TechRepository techRepository;

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

    /**
     * 남이 보는 멘토 프로필
     */
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
            LocalDate mentoringStartDate = mentoring.getMentoringStartDate();
            LocalTime mentoringStartTime = mentoring.getMentoringStartTime();

            List<String> techNameList = teamTechList.stream()
                    .map(teamTech -> {
                        return teamTech.getTech().getTechName();
                    })
                    .collect(Collectors.toList());

            mentoringInfoList.add(new MentoringInfoDto(team.getTeamName(), techNameList, mentoringStartDate, mentoringStartTime));
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

    /**
     * 내가 보는 멘토 프로필
     */
    public MentorSelfDetailSelfResponseDto findMentorSelf(Long mentorSeq) {
        // 1. mentor 찾기
        Mentor mentor = mentorRepository.findById(mentorSeq).get();

        // 2. user를 통해 mentor name, nickname, career, email 찾기
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
            LocalDate mentoringStartDate = mentoring.getMentoringStartDate();
            LocalTime mentoringStartTime = mentoring.getMentoringStartTime();

            List<String> techNameList = teamTechList.stream()
                    .map(teamTech -> {
                        return teamTech.getTech().getTechName();
                    })
                    .collect(Collectors.toList());

            mentoringInfoList.add(new MentoringInfoDto(team.getTeamName(), techNameList, mentoringStartDate, mentoringStartTime));
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

        // 6. 멘토의 가능 시간 찾기
        List<LocalTime> availableTimeList = mentorScheduleRepository.findByMentorSeq(mentorSeq).stream().sorted().collect(Collectors.toList());

        return MentorSelfDetailSelfResponseDto.builder()
                .mentorName(user.getUserName())
                .mentorCareer(mentor.getMentorCareer())
                .mentorDesc(mentor.getMentorDesc())
                .mentorEmail(user.getUserEmail())
                .mentorNickname(user.getUserNickname())
//                .mentoringAvailableTimeList(availableTimeList)
                .mentorTechList(mentorTechInfoDtoList)
                .mentoringInfoList(mentoringInfoList)
                .mentoringReviewList(reviewDtoList)
                .build();
    }


    // 멘토 정보 수정
    @Transactional
    public CommonResponseDto updateMentor(Long mentorSeq, MentorUpdateRequestDto requestDto) {
        // 멘토 정보, 유저 정보, 멘토 기술 정보 찾기
        Mentor mentor = mentorRepository.findById(mentorSeq).get();
        User user = userRepository.findById(mentorSeq).get();

        // 멘토 닉네임 == 유저 닉네임 변경
        if(StringUtils.hasText(requestDto.getMentorNickName())) {
            user.changeUserNickName(requestDto.getMentorNickName());
        }

        // 멘토 커리어 변경
        if(StringUtils.hasText(requestDto.getMentorCareer())) {
            mentor.changeMentorCareer(requestDto.getMentorCareer());
        }

        // 멘토 설명 변경
        if(StringUtils.hasText(requestDto.getMentorDesc())) {
            mentor.changeMentorDesc(requestDto.getMentorDesc());
        }

        // 멘토 이메일 == 유저 이메일 변경
        if(StringUtils.hasText(requestDto.getMentorEmail())) {
            user.changeUserEmail(requestDto.getMentorEmail());
        }

        // 멘토 기술 스택 변경
        if(!Objects.isNull(requestDto.getMentorTech())) {
            // 삭제
            mentorTechRepository.deleteByMentorSeq(mentorSeq);

            // 새로 삽입
            requestDto.getMentorTech().forEach(techSeq -> {
                mentorTechRepository.save(MentorTech.builder()
                        .mentorTechId(new MentorTechId(mentorSeq, techSeq))
                        .mentor(mentor)
                        .tech(techRepository.findById(techSeq).get())
                        .build());
            });
        }
        return new CommonResponseDto(201, "멘토 정보 수정에 성공하였습니다.");
    }

    public CommonResponseDto changeSchedule(Long mentorSeq, MentorScheduleRequestDto requestDto) {
        Mentor mentor = mentorRepository.findById(mentorSeq).get();
        LocalDate mentorDate = requestDto.getMentorDate();
        List<LocalTime> mentorTimeList = requestDto.getMentorTime();

        mentorTimeList.forEach(mentorTime -> {
            mentorScheduleRepository.save(new MentorSchedule(new MentorScheduleId(mentorDate, mentorTime, mentorSeq), mentor));
        });
        return new CommonResponseDto(201, "스케줄 설정에 성공하였습니다.");
    }

    // 멘토링 가능 스케줄 조회
    public List<LocalTime> findAvailableTime(Long mentorSeq, MentoringAvailableTimeRequestDto requestDto) {
        LocalDate selectedDate = requestDto.getSelectedDate();
        List<LocalTime> availableTimeList = mentorScheduleRepository.findByMentorSeqAndDate(mentorSeq, selectedDate);
//        List<MentoringAvailableTimeResponseDto> timeList = new ArrayList<>();
//        availableTimeList.forEach(t -> {
//            // 멘토 스케줄 테이블에서 가져오는 날짜
//            String availableTime = t.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
//            // 해당 날짜의 가능 스케줄을 서치하기 위해 가져온 날짜 정보
//            LocalDate mentorTime = requestDto.getSelectedDate();
//
//            if (availableTime.equals(mentorTime)) {
//                timeList.add(new MentoringAvailableTimeResponseDto(t));
//            }
//        });
//        return timeList.stream().sorted(Comparator.comparing(MentoringAvailableTimeResponseDto::getHhmmTime)).collect(Collectors.toList());
        return availableTimeList;
    }

    public CommonResponseDto applyMentoring(MentoringApplyRequestDto requestDto) {
        Team team = teamRepository.findById(requestDto.getTeamSeq()).get();
        Mentor mentor = mentorRepository.findById(requestDto.getMentorSeq()).get();
        Mentoring mentoring = mentoringRepository.save(requestDto.toEntity(team, mentor));
        return new CommonResponseDto(201, "멘토링 신청을 완료하였습니다.");
    }

    // 멘토의 멘토링 모든 정보 찾기
    public List<MentoringApplyListResponseDto> findMentoringApplyList(Long mentorSeq) {
        // 멘토링 정보 찾기
        List<Mentoring> mentoringList = mentoringRepository.findByMentorMentorSeqAndMentoringState(mentorSeq, MentoringState.WAIT);
        // 멘토링 시작 날짜 순 정렬 -> 시작 시간 순 정렬 -> 신청 시간 순 정렬
        return mentoringList.stream()
                .map(mentoring -> new MentoringApplyListResponseDto(mentoring))
                .sorted(Comparator.comparing(MentoringApplyListResponseDto::getMentoringStartDate).thenComparing(MentoringApplyListResponseDto::getMentoringStartTime).thenComparing(MentoringApplyListResponseDto::getMentoringCreateTime))
                .collect(Collectors.toList());
    }

    public CommonResponseDto respondMentoring(Long mentorSeq, Long mentoringSeq, MentoringApplyRespondRequestDto requestDto) {
        ResponseType responseType = requestDto.getResponseType();
        LocalDate mentoringDate = mentoringRepository.findById(mentoringSeq).get().getMentoringStartDate();
        LocalTime mentoringTime = mentoringRepository.findById(mentoringSeq).get().getMentoringStartTime();
        // 수락하는 경우
        if(ResponseType.ACCEPT.equals(responseType)) {
            // 상태를 ACCEPT으로 바꿔줌
            mentoringRepository.acceptMentoring(mentoringSeq);
            mentorScheduleRepository.deleteByDateAndTime(mentoringDate, mentoringTime);

        }

        // 거절하는 경우
        if(ResponseType.REJECT.equals(responseType)) {
            // 디비에서 삭제
            mentoringRepository.deleteByMentoringSeq(mentoringSeq);
        }
        return new CommonResponseDto(201, "멘토링 요청 응답에 성공하였습니다.");
    }
}
