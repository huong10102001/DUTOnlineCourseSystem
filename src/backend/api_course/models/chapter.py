from django.db import models
from api_base.models import TimeStampedModel
from api_course.models import Course


class Chapter(TimeStampedModel):
    title = models.CharField(max_length=255)
    previous_chapter = models.ForeignKey("self", blank=True, null=True, on_delete=models.SET_NULL)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="chapters")
    slug = models.SlugField(unique=True, null=True)

    class Meta:
        db_table = "chapters"
        ordering = ('-created_at',)
