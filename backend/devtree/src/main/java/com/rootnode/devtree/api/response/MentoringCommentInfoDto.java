package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.MentoringComment;
import com.rootnode.devtree.db.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MentoringCommentInfoDto {
    private String userName;
    private String comment;

    public MentoringCommentInfoDto(User user, MentoringComment mentoringComment) {
        this.userName = user.getUserName();
        this.comment = mentoringComment.getMentorComment();
    }
}
