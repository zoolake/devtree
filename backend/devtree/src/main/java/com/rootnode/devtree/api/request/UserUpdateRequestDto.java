package com.rootnode.devtree.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 *
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequestDto {

    private String userEmail;
    private String userName;
    private String userNickname;
    private String userDesc;
    private List<Long> userTech;

}