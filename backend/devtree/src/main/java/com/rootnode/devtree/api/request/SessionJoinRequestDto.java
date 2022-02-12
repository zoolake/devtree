package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.UserRole;
import lombok.*;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ToString
public class SessionJoinRequestDto {
    /**
     * 세션 일련번호 (== 멘토링 일련번호)
     * 유저 이름
     * 유저 일련번호
     * 유저 역할
     */
    private Long mentoringSeq;
    private String teamName;    // 안받는걸로 찾아서 쓰기
    private String userId;
    private Long userSeq;
//    private UserRole userRole;
}
