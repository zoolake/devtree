package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Tier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TierRepository extends JpaRepository<Tier,Long> {

    Tier findByTierMaxExpGreaterThanEqualAndTierMinExpLessThanEqual(Long mentorExp,Long mentorExp1);
}
