package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.UserRole;
import io.openvidu.java.client.OpenViduRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionJoinResponseDto {
    private String token;
    private OpenViduRole openViduRole;

    private String teamName;

    private Long userSeq;
    private String userId;
    private UserRole userRole;
}
