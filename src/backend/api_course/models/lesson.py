from django.db import models

from api_base.models import TimeStampedModel
from api_course.models import Chapter, Attachment
from api_user.models import User


class Lesson(TimeStampedModel):
    title = models.CharField(max_length=255)
    content = models.TextField(null=True, blank=True)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name="lessons")
    attachment = models.OneToOneField(Attachment, null=True, blank=True, on_delete=models.SET_NULL)
    previous_lesson = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)
    slug = models.SlugField(unique=True, null=True)

    class Meta:
        db_table = "lessons"
        ordering = ["created_at"]
