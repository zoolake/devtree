package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.MentoringUser;
import com.rootnode.devtree.db.entity.compositeKey.MentoringUserId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentoringUserRepository extends JpaRepository<MentoringUser, MentoringUserId> {
}
