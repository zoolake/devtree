package com.rootnode.devtree.api.controller;

import com.rootnode.devtree.api.response.TechListResponseDto;
import com.rootnode.devtree.db.entity.Tech;
import com.rootnode.devtree.db.repository.TechRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class TechApiController {
    private final TechRepository techRepository;

    @GetMapping("/v1/tech")
    public ResponseEntity<Result> techList() {
        List<Tech> techList = techRepository.findAll();
        List<TechListResponseDto> responseDtos = techList.stream()
                .map(tech -> new TechListResponseDto(tech))
                .collect(Collectors.toList());
        return ResponseEntity
                .status(200)
                .body(new Result(responseDtos,200,"기술스택 조회에 성공하였습니다."));
    }

    /**
     * List를 한번 감싸서 보내기 위하여 만든 클래스
     */
    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
        private int status;
        private String message;
    }
}
