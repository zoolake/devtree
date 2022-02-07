package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.TeamTechId;
import lombok.*;

import javax.persistence.*;

@Table(name = "tb_team_tech")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TeamTech {

    @EmbeddedId
    private TeamTechId teamTechID;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("teamSeq")
    @JoinColumn(name = "team_seq")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("techSeq")
    @JoinColumn(name = "tech_seq")
    private Tech tech;

    /**
     * 양방향 연관관계 편의 메소드
     */
    public void setTeam(Team team) {
        this.team = team;
        team.getTeamTechList().add(this);
    }
}
