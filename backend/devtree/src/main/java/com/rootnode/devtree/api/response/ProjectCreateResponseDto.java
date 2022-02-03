package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@NoArgsConstructor
public class ProjectCreateResponseDto extends CommonResponseDto{
    private Long team_seq;
    private String team_name;

    public ProjectCreateResponseDto(Team team) {
        this.team_seq = team.getTeam_seq();
        this.team_name = team.getTeam_name();
        this.status = 201;
        this.message = "프로젝트 생성에 성공하였습니다.";
    }
}
