package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.MentoringUserId;
import lombok.*;

import javax.persistence.*;

@Table(name = "tb_mentoring_user")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MentoringUser {

    @EmbeddedId
    private MentoringUserId mentoringUserID;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userSeq")
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("mentoringSeq")
    @JoinColumn(name = "mentoring_seq")
    private Mentoring mentoring;
}
