package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.StudyUser;
import com.rootnode.devtree.db.entity.compositeKey.StudyUserId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyUserRepository extends JpaRepository<StudyUser, StudyUserId> {
}
