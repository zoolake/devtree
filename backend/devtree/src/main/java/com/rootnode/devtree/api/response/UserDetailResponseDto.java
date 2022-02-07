package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Tech;
import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 *
 */
@Getter
@Builder
@NoArgsConstructor
public class UserDetailResponseDto {

    private User user;
    private List<Tech> tech;

    public UserDetailResponseDto(User user,List<Tech> tech) {
        this.user = user;
        this.tech = tech;
    }

}
