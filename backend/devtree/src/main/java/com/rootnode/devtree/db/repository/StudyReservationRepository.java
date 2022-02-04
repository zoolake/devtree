package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.StudyReservation;
import com.rootnode.devtree.db.entity.compositeKey.StudyReservationId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyReservationRepository extends JpaRepository<StudyReservation, StudyReservationId> {
}
