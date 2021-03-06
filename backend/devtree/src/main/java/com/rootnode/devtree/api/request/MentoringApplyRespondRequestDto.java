package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.entity.ResponseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentoringApplyRespondRequestDto {
    private ResponseType responseType;
}
