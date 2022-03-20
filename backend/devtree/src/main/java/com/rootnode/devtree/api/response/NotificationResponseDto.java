package com.rootnode.devtree.api.response;

import com.rootnode.devtree.db.entity.Notification;
import com.rootnode.devtree.db.entity.NotificationType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class NotificationResponseDto {
    private Long notificationSeq;
    private Long notificationSendUserSeq;
    private String notificationSendUserName;
    private Long notificationTeamSeq;
    private LocalDateTime notificationSendTime;
    private String notificationContent;
    private NotificationType notificationType;
    private boolean isCheck;

    public NotificationResponseDto(Notification notification, String sendUserName) {
        this.notificationSeq = notification.getNotificationSeq();
        this.notificationSendUserSeq = notification.getNotificationSendUserSeq();
        this.notificationSendUserName = sendUserName;
        this.notificationTeamSeq = notification.getNotificationTeamSeq();
        this.notificationSendTime = notification.getNotificationSendTime();
        this.notificationContent = notification.getNotificationContent();
        this.notificationType = notification.getNotificationType();
        this.isCheck = notification.isNotificationIsCheck();
    }
}
