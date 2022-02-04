package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StudyCreateResponseDto extends  CommonResponseDto{
    private Long team_seq;
    private String team_name;

    public StudyCreateResponseDto(Team team) {
        this.team_seq = team.getTeam_seq();
        this.team_name = team.getTeam_name();
        this.status = 201;
        this.message = "스터디 생성에 성공하셨습니다.";
    }
}
