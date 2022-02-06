package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class CommonResponseDto {
    protected int status;
    protected String message;
}
