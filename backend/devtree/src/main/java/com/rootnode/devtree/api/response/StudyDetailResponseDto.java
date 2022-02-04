package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import com.rootnode.devtree.db.entity.TeamState;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 스터디 일련번호, 스터디 관리자 일련번호
 * 스터디명,
 * 스터디 상태
 * 스터디 관리자 명 (유저 테이블)
 * 스터디 소개
 * 스터디 모집 인원,
 * 스터디 현재 인원,
 * 스터디 기술 스택
 */
@Getter
@NoArgsConstructor
public class StudyDetailResponseDto extends CommonResponseDto {
    private Long team_seq;
    private Long team_manager_seq;
    private String team_name;
    private TeamState team_state;
    private String team_manager_name;
    private int team_recruit_cnt;
    private int team_member_cnt;
    private List<TechInfoDto> team_tech;

    public StudyDetailResponseDto(Team team, String team_manager_name) {
        this.team_seq = team.getTeam_seq();
        this.team_manager_seq = team.getTeam_manager_seq();
        this.team_name = team.getTeam_name();
        this.team_state = team.getTeam_state();
        this.team_manager_name = team_manager_name;
        this.team_recruit_cnt = team.getTeam_recruit_cnt();
        this.team_member_cnt = team.getTeam_member_cnt();
        this.team_tech = team.toTechInfoDto();

        this.status = 200;
        this.message = "스터디 정보 조회에 성공하였습니다.";
    }
}
