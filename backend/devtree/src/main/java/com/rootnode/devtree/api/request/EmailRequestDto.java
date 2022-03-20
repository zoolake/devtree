package com.rootnode.devtree.api.request;

import com.rootnode.devtree.db.entity.EmailDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailRequestDto {
    private String userEmailId;
    private EmailDomain userEmailDomain;
}
