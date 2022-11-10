from django.db import models

from api_base.models import TimeStampedModel
from api_course.models import Lesson
from api_user.models import User


class Discussion(TimeStampedModel):
    content = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="discussions")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="discussions")
    parent_discussion = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name="child_discussions")

    class Meta:
        db_table = "discussions"
        ordering = ('-created_at',)
