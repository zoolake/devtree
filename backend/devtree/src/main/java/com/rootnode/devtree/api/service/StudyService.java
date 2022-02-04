package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.request.StudyCreateRequestDto;
import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamTech;
import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import com.rootnode.devtree.db.repository.TeamRepository;
import com.rootnode.devtree.db.repository.TeamTechRepository;
import com.rootnode.devtree.db.repository.TechRepository;
import com.rootnode.devtree.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class StudyService {
    private  final UserRepository userRepository;

    private final TeamRepository teamRepository;
    private final TeamTechRepository teamTechRepository;
    private final TechRepository techRepository;

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
}
