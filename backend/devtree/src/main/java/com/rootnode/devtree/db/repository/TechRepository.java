package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Tech;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TechRepository extends JpaRepository<Tech, Long> {

    @Query("select t from Tech t where t.techName = :techName")
    Tech findByTechName(String techName);
    Tech findByTechSeq(Long techSeq);
}
