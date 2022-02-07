package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MentorRepository extends JpaRepository<Mentor, Long> {
    @Query(value = "select m from Mentor m join fetch m.user", countQuery = "select count(m) from Mentor m left join m.user")
    Page<Mentor> findAllWithPagination (Pageable pageable);
}
