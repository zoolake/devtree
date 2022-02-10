package com.rootnode.devtree.db.repository;

import com.rootnode.devtree.db.entity.Mentoring;
import com.rootnode.devtree.db.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(value = "select n from Notification n where n.notificationReceiveUserSeq = :userSeq")
    List<Notification> findNotificationByUserSeq(Long userSeq);
}
