package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SessionJoinRequestDto {
    /**
     * 세션 일련번호 (== 멘토링 일련번호)
     * 유저 이름
     * 유저 일련번호
     * 유저 역할
     */
    private int sessionSeq;
    private String sessionName;
    private String userId;
    private Long userSeq;
    private UserRole userRole;
}
