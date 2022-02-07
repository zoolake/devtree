package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MentoringReviewDto {
    private TeamType teamType;
    private List<TechInfoDto> techList;
    private List<MentoringCommentInfoDto> commentList;
}
