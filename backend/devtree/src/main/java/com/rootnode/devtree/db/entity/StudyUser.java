package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.StudyUserId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tb_study_user")
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyUser {
    @EmbeddedId
    private StudyUserId studyUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_seq")
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("team_seq")
    @JoinColumn(name = "team_seq")
    private Team team;

}
