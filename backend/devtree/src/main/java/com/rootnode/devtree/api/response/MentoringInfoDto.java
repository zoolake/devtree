package com.rootnode.devtree.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MentoringInfoDto {
    private String teamName;
    private List<String> techNameList;
    private LocalDateTime mentoringStartTime;
}
