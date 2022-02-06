package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class StudyListResponseDto extends CommonResponseDto {
    private Long teamSeq;
    private Long teamManagerSeq;
    private String teamName;
    private String teamState;
    private String teamManagerName;
    private int teamRecruitCnt;
    private int teamMemberCnt;
    private List<TechInfoDto> teamTech;

    public StudyListResponseDto(Team team, String teamManagerName) {
        this.teamSeq = team.getTeamSeq();
        this.teamManagerSeq = team.getTeamManagerSeq();
        this.teamName = team.getTeamName();
        this.teamManagerName = teamManagerName;
        this.teamState = team.getTeamState().name();
        this.teamRecruitCnt = team.getTeamRecruitCnt();
        this.teamMemberCnt = team.getTeamMemberCnt();
        this.teamTech = team.toTechInfoDto();

        this.status = 200;
        this.message = "스터디 목록 조회에 성공하였습니다.";
    }

}
