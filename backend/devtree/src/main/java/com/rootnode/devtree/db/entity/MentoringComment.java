package com.rootnode.devtree.db.entity;

import com.rootnode.devtree.db.entity.compositeKey.MentoringCommentId;
import lombok.*;

import javax.persistence.*;

@Table(name = "tb_mentoring_comment")
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MentoringComment {

    @EmbeddedId
    private MentoringCommentId mentoringCommentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userSeq")
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("mentoringSeq")
    @JoinColumn(name = "mentoring_seq")
    private Mentoring mentoring;

    @Column(name = "mentor_comment")
    private String mentorComment;
}
