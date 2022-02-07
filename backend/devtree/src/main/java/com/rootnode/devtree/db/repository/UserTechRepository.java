package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.User;
import com.rootnode.devtree.db.entity.UserTech;
import com.rootnode.devtree.db.entity.compositeKey.UserTechId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface UserTechRepository extends JpaRepository<UserTech, UserTechId> {
//    @Query(value = "select u.userTechId.tech from UserTech u where u.userSeq = :user_seq")
    List<UserTech> findByUserTechIdUserSeq(Long user_seq);
}
