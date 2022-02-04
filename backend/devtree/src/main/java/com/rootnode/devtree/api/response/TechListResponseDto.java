package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Tech;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TechListResponseDto{
    private Long techSeq;
    private String techName;

    public TechListResponseDto(Tech tech) {
        this.techSeq = tech.getTech_seq();
        this.techName = tech.getTech_name();
    }
}
