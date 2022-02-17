package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.StudyCreateRequestDto;
import com.rootnode.devtree.api.request.StudyJoinRequestDto;
import com.rootnode.devtree.api.request.StudyRespondRequestDto;
import com.rootnode.devtree.api.request.StudyUpdateRequestDto;
import com.rootnode.devtree.api.response.*;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.StudyReservationId;
import com.rootnode.devtree.db.entity.compositeKey.StudyUserId;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyService {
    private  final UserRepository userRepository;

    private final TeamRepository teamRepository;
    private final TeamTechRepository teamTechRepository;
    private final TechRepository techRepository;
    private final NotificationRepository notificationRepository;

    private final StudyReservationRepository studyReservationRepository;
    private final StudyUserRepository studyUserRepository;

    // 스터디 생성
    @Transactional
    public Team save(StudyCreateRequestDto requestDto) {
        Team team = teamRepository.save(requestDto.toEntity());

        requestDto.getTeamTech().forEach(tech -> {
            teamTechRepository.save(TeamTech.builder()
                    .teamTechID(new TeamTechId(tech, team.getTeamSeq()))
                    .team(team)
                    .tech(techRepository.findById(tech).get())
                    .build());
        });

        // 스터디 생성하면 스터디 유저 테이블에 생성한 사람 추가, 팀 현재원 1 증가
        Long userSeq = team.getTeamManagerSeq();
        Long teamSeq = team.getTeamSeq();
        StudyUserId studyUserId = new StudyUserId(userSeq, teamSeq);
        User user = userRepository.findById(userSeq).get();
        // 1. Study_User_Repository에 현재 사용자 insert
        studyUserRepository.save(new StudyUser(studyUserId, user, team));
        // 2. 해당 팀 현재원 1 증가
        teamRepository.findById(teamSeq).get().addTeamMember();

        return team;
    }

    // 팀 목록 중 스터디 찾기
    @Transactional(readOnly = true)
    public List<StudyListResponseDto> findStudy(TeamType teamType) {
        // 1. team_type 기반으로 목록 조회 진행
        List<Team> teamList = teamRepository.findAllByTeamType(teamType);

        // 2. 얻어온 목록들을 기반으로 userRepository에서 관리자 명을 찾아서 Dto로 만들고 반환해주는 방식
        return teamList.stream()
                .map(team -> {
                    String managerName = userRepository.findById(team.getTeamManagerSeq()).get().getUserName();
                    return new StudyListResponseDto(team, managerName);
                })
                .collect(Collectors.toList());
    }

    // 스터디 상세 조회
    @Transactional(readOnly = true)
    public StudyDetailResponseDto findStudyDetail(Long teamSeq) {
        // 1. 팀 테이블 조회
        Team team = teamRepository.findTeamByTeamSeq(teamSeq);
        // 2. team_manager_seq로 관리자 이름 조회
        String managerName = userRepository.findById(team.getTeamManagerSeq()).get().getUserName();
        //3. Dto로 변환하여 반환
        return new StudyDetailResponseDto(team, managerName);
    }

    // 스터디 멤버 조회
    public List<StudyMemberListResponseDto> findStudyMember(Long teamSeq) {
        // 1. 팀 테이블 조회
        List<User> userList = studyUserRepository.findUserByTeamSeq(teamSeq);
        return userList.stream().map(user -> new StudyMemberListResponseDto(user)).collect(Collectors.toList());
    }


    // 스터디 신청
    public CommonResponseDto joinStudy(Long userSeq, Long teamSeq, StudyJoinRequestDto requestDto) {
        // 1. User 객체를 찾는다.
        User user = userRepository.findById(userSeq).get();
        System.out.println(user.getUserName());
        // 2. Team 객체를 찾는다.
        Team team = teamRepository.findTeamByTeamSeq(teamSeq);
        // 3. 저장
        studyReservationRepository.save(requestDto.toEntity(teamSeq, team, user));

        // 4. 스터디 신청 알림 보내기
        // 알림 내용
        String content = user.getUserName() + "님이 " + team.getTeamName() + "팀 스터디에 신청 요청을 보냈습니다";
        //sendUserSeq, receiveUserSeq, teamSeq, sendTime, content, notificationType
        Notification notification = new Notification(userSeq, team.getTeamManagerSeq(), teamSeq,
                LocalDateTime.now(), content,NotificationType.STUDY);
        // 5. 알림 테이블에 저장
        notificationRepository.save(notification);

        return new CommonResponseDto(201, "스터디 신청에 성공하였습니다.");
    }

    // 스터디 신청 응답
    @Transactional
    public CommonResponseDto respondStudy(Long teamSeq, StudyRespondRequestDto requestDto) {
        // 응답 타입 (수락 / 거절)
        Long userSeq = requestDto.getUserSeq();
        ResponseType responseType = requestDto.getResponseType();
        StudyUserId studyUserId = new StudyUserId(userSeq, teamSeq);
        User user = userRepository.findById(userSeq).get();
        Team team = teamRepository.findById(teamSeq).get();

        // 1. 수락을 하는 경우
        if(ResponseType.ACCEPT.equals(responseType)) {
            // 1. Study_User_Repository에 insert
            studyUserRepository.save(new StudyUser(studyUserId, user, team));
            // 2. 해당 팀 현재원 1 증가
            teamRepository.findById(teamSeq).get().addTeamMember();
            // 3. Study_Reservation_Repository 에 있는 (userSeq, teamSeq) 데이터 삭제
            studyReservationRepository.deleteById(new StudyReservationId(userSeq, teamSeq));

            // 4. 스터디 신청 수락 알림 보내기
            // 알림 내용
            Long teamManagerSeq = team.getTeamManagerSeq();
            String content = team.getTeamName() + "팀 스터디 신청이 수락되었습니다!";
            //sendUserSeq, receiveUserSeq, teamSeq, sendTime, content, notificationType
            Notification notification = new Notification(teamManagerSeq, userSeq, teamSeq,
                    LocalDateTime.now(), content,NotificationType.STUDY);
            // 5. 알림 테이블에 저장
            notificationRepository.save(notification);
        }

        // 2. 거절을 하는 경우
        if (ResponseType.REJECT.equals(responseType)) {
            // 1. 해당 신청 기록을 Study_Reservation_Repository 에서 삭제
            studyReservationRepository.deleteById(new StudyReservationId(userSeq, teamSeq));

            // 2. 스터디 신청 거절 알림 보내기
            // 알림 내용
            Long teamManagerSeq = team.getTeamManagerSeq();
            String content = team.getTeamName() + "팀 스터디 신청이 거절되었습니다.";
            //sendUserSeq, receiveUserSeq, teamSeq, sendTime, content, notificationType
            Notification notification = new Notification(teamManagerSeq, userSeq, teamSeq,
                    LocalDateTime.now(), content,NotificationType.STUDY);
            // 5. 알림 테이블에 저장
            notificationRepository.save(notification);
            return new CommonResponseDto(201, "스터디 요청을 거절하였습니다.");
        }
        return new CommonResponseDto(201, "스터디 요청을 수락하였습니다.");
    }

    // 스터디 신청 조회
    public List<StudyJoinListResponseDto> findStudyJoinList(Long teamSeq) {
        List<StudyReservation> joinList = studyReservationRepository.findByTeamSeq(teamSeq);
        return joinList.stream()
                .map(entity -> new StudyJoinListResponseDto(entity))
                .collect(Collectors.toList());
    }

    // 스터디 상태 변경 == 프로젝트 상태 변경 == 팀 상태 변경

    // 스터디 정보 수정
    @Transactional
    public CommonResponseDto updateStudy(Long teamSeq, StudyUpdateRequestDto requestDto) {
        Team team = teamRepository.findById(teamSeq).get();

        // 팀 이름 변경
        if(StringUtils.hasText(requestDto.getTeamName())) {
            team.changeTeamName(requestDto.getTeamName());
        }

        // 팀 설명 변경
        if(StringUtils.hasText(requestDto.getTeamDesc())) {
            team.changeTeamDesc(requestDto.getTeamDesc());
        }

        // 팀 기술 스택 변경
        if(!Objects.isNull(requestDto.getTeamTech())) {
            // 부모 쪽 먼저 삭제
            team.getTeamTechList().clear();
            // 자식 쪽 삭제
            teamTechRepository.deleteByTeamSeq(teamSeq);

            // 새로 삽입
            requestDto.getTeamTech().forEach(techSeq -> {
                teamTechRepository.save(TeamTech.builder()
                        .teamTechID(new TeamTechId(teamSeq, techSeq))
                        .team(team)
                        .tech(techRepository.findById(techSeq).get())
                        .build());
            });
        }

        // 팀 인원 변경
        // 현재 팀 모집 인원과 수정된 팀 모집 인원이 다르고
        if(team.getTeamRecruitCnt() != requestDto.getTeamRecruitCnt()) {
            // 수정하려고 하는 팀 모집 인원이 현재 팀 인원보다 작거나 같으면 변경
            if(team.getTeamMemberCnt() <= requestDto.getTeamRecruitCnt()) {
                team.changeTeamRecruitCnt(requestDto.getTeamRecruitCnt());
            } else {
                return new CommonResponseDto(201, "스터디 인원을 변경할 수 없습니다.");
            }
        }

        return new CommonResponseDto(201, "스터디 정보 수정에 성공하였습니다.");
    }

    // 팀 관리자 변경
    @Transactional
    public CommonResponseDto changeTeamManager(Long teamSeq, Long userSeq) {
        Team team = teamRepository.findById(teamSeq).get();
        if(team.getTeamManagerSeq() != userSeq) {
            team.changeTeamManager(userSeq);
        } else {
            return new CommonResponseDto(201, "스터디 관리자를 변경할 수 없습니다.");
        }
        return new CommonResponseDto(201, "스터디 관리자를 변경하였습니다.");
    }

    // 스터디 삭제
    @Transactional
    public CommonResponseDto deleteStudy(Long teamSeq) {
        teamTechRepository.deleteByTeamSeq(teamSeq);
        studyReservationRepository.deleteByTeamSeq(teamSeq);
        studyUserRepository.deleteByTeamSeq(teamSeq);

        teamRepository.deleteById(teamSeq);
        return new CommonResponseDto(204, "스터디 삭제에 성공하였습니다.");
    }
}
