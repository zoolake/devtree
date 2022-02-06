package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.StudyCreateRequestDto;
import com.rootnode.devtree.api.request.StudyJoinRequestDto;
import com.rootnode.devtree.api.request.StudyRespondRequestDto;
import com.rootnode.devtree.api.response.CommonResponseDto;
import com.rootnode.devtree.api.response.StudyDetailResponseDto;
import com.rootnode.devtree.api.response.StudyListResponseDto;
import com.rootnode.devtree.db.entity.*;
import com.rootnode.devtree.db.entity.compositeKey.StudyReservationId;
import com.rootnode.devtree.db.entity.compositeKey.StudyUserId;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyService {
    private  final UserRepository userRepository;

    private final TeamRepository teamRepository;
    private final TeamTechRepository teamTechRepository;
    private final TechRepository techRepository;

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

    // 스터디 신청
    public CommonResponseDto joinStudy(Long teamSeq, StudyJoinRequestDto requestDto) {
        Long userSeq = requestDto.getUserSeq();
        System.out.println("userSeq >>> " + userSeq);
        // 1. User 객체를 찾는다.
        User user = userRepository.findById(userSeq).get();
        System.out.println(user.getUserName());
        // 2. Team 객체를 찾는다.
        Team team = teamRepository.findTeamByTeamSeq(teamSeq);
        // 3. 저장
        studyReservationRepository.save(requestDto.toEntity(teamSeq, team, user));

        return new CommonResponseDto(201, "스터디 신청에 성공하였습니다.");
    }

    // 스터디 신청 응답
    @Transactional
    public CommonResponseDto respondStudy(Long teamSeq, Long userSeq, StudyRespondRequestDto requestDto) {
        // 응답 타입 (수락 / 거절)
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
        }

        // 2. 거절을 하는 경우
        if (ResponseType.REJECT.equals(responseType)) {
            // 1. 해당 신청 기록을 Study_Reservation_Repository 에서 삭제
            studyReservationRepository.deleteById(new StudyReservationId(userSeq, teamSeq));
        }


        return new CommonResponseDto(201, "스터디 요청 응답에 성공하였습니다.");
    }
}
