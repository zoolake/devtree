package com.rootnode.devtree.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
public class MentoringAvailableTimeResponseDto {
    private String hhmmTime;

    public MentoringAvailableTimeResponseDto(LocalDateTime dateTime) {
        this.hhmmTime = dateTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
