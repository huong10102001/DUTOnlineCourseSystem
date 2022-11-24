
import pathlib
import uuid
from django.utils.text import slugify
from django.db import models
from api_base.models import TimeStampedModel
from api_course.models import Course, Lesson, Attachment
from django.utils import timezone

from api_process.constants import ProcessCourseStatus, ProcessLessonStatus
from api_user.models import User
from api_course.constants import StarRating


def upload_path(instance, filename):
    fpath = pathlib.Path(filename)
    new_name = instance.course.title + "-" + instance.user.full_name + "-" + str(uuid.uuid1())
    final_path = "/".join(
        ['certificates', slugify(f"{instance.user.full_name} {str(uuid.uuid1())}")])
    return f"{final_path}/{new_name}{fpath.suffix}"


class ProcessCourse(TimeStampedModel):
    status = models.CharField(choices=ProcessCourseStatus.choices(), default=ProcessCourseStatus.OPEN.value, max_length=50)
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.SET_NULL, related_name="process_course")
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="process_course")
    course_title = models.CharField(max_length=50, default='')
    last_learn_date = models.DateTimeField(max_length=50, default=timezone.now)
    learn_completed_date = models.DateTimeField(max_length=50, null=True, blank=True)
    certificate = models.FileField(blank=True, null=True, upload_to=upload_path)

    class Meta:
        db_table = "process_course"
        # ordering = ('-created_at',)


class ProcessLesson(TimeStampedModel):
    status = models.CharField(choices=ProcessLessonStatus.choices(), default=ProcessLessonStatus.LOCK.value, max_length=50)
    lesson = models.ForeignKey(Lesson, null=True, blank=True, on_delete=models.SET_NULL, related_name="process_lesson")
    lesson_title = models.CharField(max_length=50, default='')
    attachment = models.ForeignKey(Attachment, null=True, blank=True, on_delete=models.SET_NULL, related_name="process_lesson")
    process_course = models.ForeignKey(ProcessCourse, null=True, blank=True, on_delete=models.SET_NULL, related_name="process_lesson")
    previous_process_lesson = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = "process_lesson"
        ordering = ('-created_at',)


class CourseRating(TimeStampedModel):
    title = models.CharField(max_length=50, default='Send Rating For Course')
    star_rating = models.IntegerField(choices=StarRating.choices(), default=StarRating.FIVE.value)
    content = models.CharField(max_length=255, null=True, blank=True)
    process_course = models.OneToOneField(ProcessCourse, null=True, blank=True, on_delete=models.SET_NULL, related_name="ratings")

    class Meta:
        db_table = "course_rating"
        ordering = ('-created_at',)
