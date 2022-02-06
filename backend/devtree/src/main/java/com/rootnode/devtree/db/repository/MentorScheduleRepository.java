package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.MentorSchedule;
import com.rootnode.devtree.db.entity.compositeKey.MentorScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorScheduleRepository extends JpaRepository<MentorSchedule, MentorScheduleId> {
}
