from django.db import models
from api_base.models import TimeStampedModel
from api_course.constants import CourseStatus
from api_user.models import User


class Course(TimeStampedModel):
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, null=True)
    description = models.TextField()
    background = models.FileField(blank=True, null=True, upload_to='course/')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")
    topics = models.ManyToManyField(blank=True, related_name='courses', to='api_topic.Topic')
    cost = models.FloatField(default=0)
    status = models.CharField(choices=CourseStatus.choices(), default=CourseStatus.DRAFT.value, max_length=50)
    certificate_frame = models.TextField()

    class Meta:
        db_table = "courses"
        ordering = ('-created_at',)
