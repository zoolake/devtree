package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionId;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Table(name = "tb_project_position")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ProjectPosition {

    @EmbeddedId
    private ProjectPositionId projectPositionID;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("teamSeq")
    @JoinColumn(name = "team_seq")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("detailPositionName")
    @JoinColumn(name = "detail_position_name")
    private Position position;

    @Column(name = "position_recruit_cnt")
    private int positionRecruitCnt;

    @Column(name = "position_member_cnt")
    private int positionMemberCnt;

    @OneToMany(mappedBy = "projectPosition", cascade = CascadeType.REMOVE)
    private List<ProjectPositionReservation> projectPositionReservationList;

    @OneToMany(mappedBy = "projectPosition", cascade = CascadeType.REMOVE)
    private List<ProjectPositionUser> projectPositionUserList;

    /**
     * 비즈니스 로직은 도메인에 작성해야 한다.
     * 노션 / 백엔드 / 스프링 부트와 AWS로 혼자 구현하는... 참고하시면 됩니다.
     */

    // 해당 포지션 모집된 멤버 증가
    public void addMemberCount() {
        this.positionMemberCnt += 1;
    }

    // 해당 포지션 정원 변경
    public void changeRecruitCount(int positionRecruitCnt) {
        this.positionRecruitCnt = positionRecruitCnt;
    }
}
