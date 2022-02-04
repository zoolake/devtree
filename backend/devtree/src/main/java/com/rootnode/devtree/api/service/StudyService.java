package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.StudyCreateRequestDto;
import com.rootnode.devtree.api.response.StudyListResponseDto;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamTech;
import com.rootnode.devtree.db.entity.TeamType;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.TeamRepository;
import com.rootnode.devtree.db.repository.TeamTechRepository;
import com.rootnode.devtree.db.repository.TechRepository;
import com.rootnode.devtree.db.repository.UserRepository;
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

    // 스터디 생성
    @Transactional
    public Team save(StudyCreateRequestDto requestDto) {
        Team team = teamRepository.save(requestDto.toEntity());

        requestDto.getTeam_tech().forEach(tech -> {
            teamTechRepository.save(TeamTech.builder()
                    .teamTechID(new TeamTechId(tech, team.getTeam_seq()))
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
                    String managerName = userRepository.findById(team.getTeam_manager_seq()).get().getUser_name();
                    return new StudyListResponseDto(team, managerName);
                })
                .collect(Collectors.toList());
    }
}
