package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.db.repository.PositionRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PositionApiController {
    private final PositionRepository positionRepository;

    @GetMapping("/v1/position")
    public ResponseEntity<Result> positionList() {
        return ResponseEntity
                .status(200)
                .body(new Result(positionRepository.findAll(), 200, "포지션 목록 조회에 성공하였습니다."));
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
        private int status;
        private String message;
    }
}
