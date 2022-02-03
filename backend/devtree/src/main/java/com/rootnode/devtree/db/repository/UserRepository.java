package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
