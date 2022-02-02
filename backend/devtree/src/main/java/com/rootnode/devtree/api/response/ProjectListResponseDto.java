package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectListResponseDto extends CommonResponseDto{
    private Long team_seq;
    private Long team_manager_seq;
    private String team_name;
    private String team_state;
    private String team_manager_name;
    private int team_recruit_cnt;
    private int team_member_cnt;
    private List<TechInfoDto> team_tech;

    public ProjectListResponseDto(Team team, String team_manger_name) {
        this.team_seq = team.getTeam_seq();
        this.team_manager_seq = team.getTeam_manager_seq();
        this.team_name = team.getTeam_name();
        this.team_manager_name = team_manger_name;
        this.team_state = team.getTeam_state().name();
        this.team_recruit_cnt = team.getTeam_recruit_cnt();
        this.team_member_cnt = team.getTeam_member_cnt();
        this.team_tech = team.toTechInfoDto();

        this.status = 200;
        this.message = "프로젝트 목록 조회에 성공하였습니다.";
    }

}
