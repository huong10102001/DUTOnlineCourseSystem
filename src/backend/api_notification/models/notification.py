from django.db import models

from api_base.models import TimeStampedModel
from api_user.models import User
from api_course.models import Discussion, Course


class Notification(TimeStampedModel):
    title = models.CharField(max_length=150)
    content = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name="notification_user")
    user_reply = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name="notification_user_reply")
    discussion = models.ForeignKey(Discussion, null=True, blank=True, on_delete=models.CASCADE, related_name="notification")
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.CASCADE,
                                   related_name="notification")
    isRead = models.BooleanField(default=False)

    class Meta:
        db_table = "notification"
        ordering = ['-created_at']
