package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.*;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import com.rootnode.devtree.db.entity.compositeKey.MentorTechId;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
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
    private final TierRepository tierRepository;
    private final NotificationRepository notificationRepository;

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
                reviewDtoList.add(new MentoringCommentInfoDto(userRepository.findById(mentoringComment.getUser().getUserSeq()).get(), mentoringComment));
            });

        });
        // 6. 멘토 티어
        Tier tier =tierRepository.findByTierMaxExpGreaterThanEqualAndTierMinExpLessThanEqual(mentor.getMentorExp(),mentor.getMentorExp());

        return MentorDetailResponseDto.builder()
                .mentorCareer(mentor.getMentorCareer())
                .mentorDesc(mentor.getMentorDesc())
                .mentorEmail(user.getUserEmail())
                .mentorNickname(user.getUserNickname())
                .mentorTechList(mentorTechInfoDtoList)
                .mentoringInfoList(mentoringInfoList)
                .mentoringReviewList(reviewDtoList)
                .tier(tier)
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
                reviewDtoList.add(new MentoringCommentInfoDto(userRepository.findById(mentoringComment.getUser().getUserSeq()).get(), mentoringComment));
            });

        });

        // 6. 멘토의 가능 시간 찾기
        // 날짜 별 가능한 시간 찾기
        LocalDate currentDate = LocalDate.now();
        List<MentorScheduleId> mentorTimeList = mentorScheduleRepository.findAfterNowByMentorSeq(mentorSeq, currentDate);

        List<MentorTimeInfoDto> availableTimeList = new ArrayList<>();

        mentorTimeList.forEach(schedule -> {
            // false면 없음, true면 있음
            boolean exist = false;
            LocalDate date = schedule.getMentorDate();
            LocalTime time = schedule.getMentorTime();
            for (MentorTimeInfoDto availableTime : availableTimeList) {
                if(availableTime.getMentorDate().equals(date)) {
                    availableTime.getMentorTime().add(time);
                    exist = true;
                    break;
                }
            }
            if(!exist) {
                List<LocalTime> timeList = new ArrayList<>();
                timeList.add(time);
                availableTimeList.add(new MentorTimeInfoDto(date, timeList));
            }
        });
        availableTimeList.stream().sorted(Comparator.comparing(MentorTimeInfoDto::getMentorDate)).collect(Collectors.toList());
        availableTimeList.forEach(availableTime->{
            List<LocalTime> timeList = availableTime.getMentorTime();
            Collections.sort(timeList);
        });

        return MentorSelfDetailSelfResponseDto.builder()
                .mentorName(user.getUserName())
                .mentorCareer(mentor.getMentorCareer())
                .mentorDesc(mentor.getMentorDesc())
                .mentorEmail(user.getUserEmail())
                .mentorNickname(user.getUserNickname())
                .mentorTimeList(availableTimeList)
                .mentorTechList(mentorTechInfoDtoList)
                .mentoringInfoList(mentoringInfoList)
                .mentoringReviewList(reviewDtoList)
                .tier(tierRepository.findByTierMaxExpGreaterThanEqualAndTierMinExpLessThanEqual(mentor.getMentorSeq(),mentor.getMentorExp()))
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
        return availableTimeList;
    }

    // 멘토링 신청
    public CommonResponseDto applyMentoring(MentoringApplyRequestDto requestDto) {
        Team team = teamRepository.findById(requestDto.getTeamSeq()).get();
        Mentor mentor = mentorRepository.findById(requestDto.getMentorSeq()).get();
        mentoringRepository.save(requestDto.toEntity(team, mentor));

        // 멘토링 신청 알림 보내기
        // 알림 내용
        String content = team.getTeamName() + "팀("+ team.getTeamType() +")이 멘토링 신청 요청을 보냈습니다";
        //sendUserSeq, receiveUserSeq, teamSeq, sendTime, content, notificationType
        Notification notification = new Notification(team.getTeamManagerSeq(), mentor.getMentorSeq(), team.getTeamSeq(),
                LocalDateTime.now(), content,NotificationType.MENTORING);
        // 5. 알림 테이블에 저장
        notificationRepository.save(notification);

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

    // 멘토링 응답
    public CommonResponseDto respondMentoring(Long mentorSeq, Long mentoringSeq, MentoringApplyRespondRequestDto requestDto) {
        ResponseType responseType = requestDto.getResponseType();
        LocalDate mentoringDate = mentoringRepository.findById(mentoringSeq).get().getMentoringStartDate();
        LocalTime mentoringTime = mentoringRepository.findById(mentoringSeq).get().getMentoringStartTime();

        Mentor mentor = mentorRepository.findById(mentorSeq).get();
        Mentoring mentoring = mentoringRepository.findById(mentoringSeq).get();
        Team team = teamRepository.findById(mentoring.getTeam().getTeamSeq()).get();


        // 수락하는 경우
        if(ResponseType.ACCEPT.equals(responseType)) {
            // 상태를 ACCEPT으로 바꿔줌
            mentoringRepository.acceptMentoring(mentoringSeq);
            // 멘토 스케줄 테이블에서 삭제
            mentorScheduleRepository.deleteByDateAndTime(mentoringDate, mentoringTime);

            int mCount = mentor.getMentoringCnt() + 1;
            //횟수 증가
            mentor.changeMentorCount(mCount);
            //현재 팀
            Team CurTeam = mentoringRepository.findById(mentoringSeq).get().getTeam();
            //현재팀과
            int Count = mentoringRepository.countByTeamTeamSeqAndMentorMentorSeq(CurTeam.getTeamSeq(),mentorSeq);
            //맨토링을 할때마다 기본으로 100, 같은 팀이라면 +20 ~ +30 ~ +40  +50
            mentor.changeMentorExp(mCount*100L+10+10*Count);

            // 멘토링 신청 알림 보내기
            // 알림 내용
            String content = userRepository.findByUserSeq(mentorSeq).get().getUserNickname() + "멘토님이"+ team.getTeamName() +"팀이 멘토링 요청을 수락하였습니다!";
            //sendUserSeq, receiveUserSeq, teamSeq, sendTime, content, notificationType
            Notification notification = new Notification(mentorSeq, team.getTeamManagerSeq(), team.getTeamSeq(),
                    LocalDateTime.now(), content,NotificationType.MENTORING);
            // 5. 알림 테이블에 저장
            notificationRepository.save(notification);
        }

        // 거절하는 경우
        if(ResponseType.REJECT.equals(responseType)) {
            // 디비에서 삭제
            mentoringRepository.deleteByMentoringSeq(mentoringSeq);

            // 멘토링 신청 알림 보내기
            // 알림 내용
            String content = userRepository.findByUserSeq(mentorSeq).get().getUserNickname() + " 멘토님이 "+ team.getTeamName() +" 팀 멘토링 요청을 거절하였습니다.";
            //sendUserSeq, receiveUserSeq, teamSeq, sendTime, content, notificationType
            Notification notification = new Notification(mentorSeq, team.getTeamManagerSeq(), team.getTeamSeq(),
                    LocalDateTime.now(), content,NotificationType.MENTORING);
            // 5. 알림 테이블에 저장
            notificationRepository.save(notification);
        }
        return new CommonResponseDto(201, "멘토링 요청 응답에 성공하였습니다.");
    }
}
