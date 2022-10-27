import pathlib
import uuid

from django.db import models
from api_base.models import TimeStampedModel
from api_course.constants import CourseStatus
from api_user.models import User


def upload_path(instance, filename):
    fpath = pathlib.Path(filename)
    new_name = str(uuid.uuid1())
    final_path = "/".join(
        ['courses', str(instance.id)])

    return f"{final_path}/{new_name}{fpath.suffix}"


class Course(TimeStampedModel):
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, null=True)
    description = models.TextField()
    background = models.FileField(blank=True, null=True, upload_to=upload_path)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")
    topics = models.ManyToManyField(blank=True, null=True, related_name='courses', to='api_topic.Topic')
    cost = models.FloatField(default=0)
    status = models.CharField(choices=CourseStatus.choices(), default=CourseStatus.DRAFT.value, max_length=50)
    certificate_frame = models.TextField()

    class Meta:
        db_table = "courses"
        ordering = ('-created_at',)
