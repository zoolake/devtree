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
    @Column(name = "notification_seq")
    private Long notificationSeq;

    @Column(name = "notification_send_user_seq")
    private Long notificationSendUserSeq;

    @Column(name = "notification_receive_user_seq")
    private Long notificationReceiveUserSeq;

    @Column(name = "notification_send_time")
    private LocalDateTime notificationSendTime;

    @Column(name = "notification_team_seq")
    private Long notificationTeamSeq;

    @Column(name = "notification_content")
    private String notificationContent;

    @Column(name = "is_check")
    private boolean notificationIsCheck;

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    public Notification(Long sendUserSeq, Long receiveUserSeq, Long teamSeq, LocalDateTime sendTime,
                        String content, NotificationType notificationType) {
        this.notificationSendUserSeq = sendUserSeq;
        this.notificationReceiveUserSeq = receiveUserSeq;
        this.notificationTeamSeq = teamSeq;
        this.notificationSendTime = sendTime;
        this.notificationContent = content;
        this.notificationIsCheck = false;
        this.notificationType = notificationType;
    }
}
