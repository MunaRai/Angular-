export class Notification {
    notificationId: string;

    gpsAttributeLat: number;

    gpsAttributeLng: number;

    gpsAttributeSpeed: string;

    gpsAttributeTrackerModelName: string;

    gpsAttributeTrackerName: string;

    isSeen: boolean;

    notificaitonCount: number;

    notificationCreatedDate: string;

    notificationType: {notification: string, value: boolean};

    notificationImeiNumber: number;
}
