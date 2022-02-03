package com.rootnode.devtree.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "tb_notification")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notification_seq;
    private Long notification_send_user_seq;
    private Long notification_receive_user_seq;
    private LocalDateTime notification_send_time;
    private String notification_detail_position_name;
    private String notification_content;
//
//    @Enumerated(EnumType.STRING)
//    private NotificationType notificationType;

}
