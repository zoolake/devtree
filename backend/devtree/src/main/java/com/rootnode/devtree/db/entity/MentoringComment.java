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
    @MapsId("mentoringUserID")
    @JoinColumns({
            @JoinColumn(name = "user_seq"),
            @JoinColumn(name = "mentoring_seq")
    })
    private MentoringUser mentoringUser;

    private String mentor_comment;
}
