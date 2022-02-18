package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class MentorCertificationRequestDto {
    private Long userSeq;

    public Mentor toEntity(User user) {
        return Mentor.builder()
                .user(user)
                .mentorSeq(userSeq)
                .build();
    }
}
