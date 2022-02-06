package com.rootnode.devtree.api.service;

import com.rootnode.devtree.api.response.MentorListResponseDto;
import com.rootnode.devtree.api.response.MentorTechInfoDto;
import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.repository.MentorRepository;
import com.rootnode.devtree.db.repository.MentorTechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MentorService {
    private final MentorRepository mentorRepository;
    private final MentorTechRepository mentorTechRepository;

    public Page<MentorListResponseDto> findMentors(Pageable pageable) {
        Page<Mentor> mentors = mentorRepository.findAllWithPagination(pageable);
        return new PageImpl(mentors.stream()
                .map(mentor -> {
                    List<MentorTechInfoDto> mentorTechInfoDtoList =
                            mentorTechRepository.findByMentorTechIdMentorSeq(mentor.getMentorSeq()).stream()
                            .map(mentorTech -> new MentorTechInfoDto(mentorTech))
                            .collect(Collectors.toList());

                    return new MentorListResponseDto(mentor, mentorTechInfoDtoList);
                })
                .collect(Collectors.toList()));
    }
}
