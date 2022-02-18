package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class StudyMemberListResponseDto {
    private Long userSeq;
    private String userName;

    public StudyMemberListResponseDto(User user) {
        this.userSeq = user.getUserSeq();
        this.userName = user.getUserName();
    }
}
