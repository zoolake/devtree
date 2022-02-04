package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.ProjectPositionUserId;
import lombok.*;

import javax.persistence.*;

@Table(name = "tb_project_position_user")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ProjectPositionUser {

    @EmbeddedId
    private ProjectPositionUserId projectPositionUserID;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectPositionID")
    @JoinColumns({
            @JoinColumn(name = "team_seq", referencedColumnName = "team_seq"),
            @JoinColumn(name = "detail_position_name", referencedColumnName = "detail_position_name")
    })
    private ProjectPosition projectPosition;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_seq")
    @JoinColumn(name = "user_seq")
    private User user;
}
