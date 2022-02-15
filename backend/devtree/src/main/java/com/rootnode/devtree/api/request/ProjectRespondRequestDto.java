package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.ResponseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ProjectRespondRequestDto {
    private Long userSeq;
    private String detailPositionName;
    private ResponseType responseType;
}
