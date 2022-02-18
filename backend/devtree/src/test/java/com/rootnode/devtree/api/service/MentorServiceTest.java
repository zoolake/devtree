package com.rootnode.devtree.api.service;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.MentoringState;
import com.rootnode.devtree.db.repository.MentoringRepository;
import com.rootnode.devtree.db.repository.TeamRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MentorServiceTest {

    @Autowired
    MentorService mentorService;

    @Autowired
    MentoringRepository mentoringRepository;

    @Transactional
    @Test
    void 멘토링_상태_변경() {
        // given
        MentoringState currentState = MentoringState.ACCEPT;
        Mentoring mentoring = new Mentoring(1L, null, null, null, null, null, null, currentState);
        mentoringRepository.save(mentoring);

        // when
        mentorService.changeMentoringState(1L);

        // then
        Assertions.assertThat(MentoringState.ACTIVATE).isEqualTo(mentoringRepository.findById(1L).get().getMentoringState());
    }
}