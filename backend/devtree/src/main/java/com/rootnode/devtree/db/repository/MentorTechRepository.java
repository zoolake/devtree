package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Mentor;
import com.rootnode.devtree.db.entity.MentorTech;
import com.rootnode.devtree.db.entity.compositeKey.MentorTechId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MentorTechRepository extends JpaRepository<MentorTech, MentorTechId> {
    //select ? from ? join ? on id = id
    @Query(value = "select t from MentorTech t join fetch t.tech where t.mentor.mentorSeq = :mentorSeq")
    List<MentorTech> findByMentorTechIdMentorSeq(Long mentorSeq);

    @Query(value = "select t.tech.techSeq from MentorTech t where t.mentor.mentorSeq = :mentorSeq")
    List<Long> findMentorTechByMentorSeq(Long mentorSeq);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from MentorTech t where t.mentor.mentorSeq = :mentorSeq")
    void deleteByMentorSeq(Long mentorSeq);

    @Query(value = "select t.mentor from MentorTech t where t.tech.techSeq = :techSeq")
    List<Mentor> findByTechSeq(Long techSeq);

}
