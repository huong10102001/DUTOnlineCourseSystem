
from django.db import models
from api_base.models import TimeStampedModel
from api_course.models import Course, Lesson, Attachment
from django.utils import timezone

from api_process.constants import ProcessCourseStatus, ProcessLessonStatus
from api_user.models import User


class ProcessCourse(TimeStampedModel):
    status = models.CharField(choices=ProcessCourseStatus.choices(), default=ProcessCourseStatus.OPEN.value, max_length=50)
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.SET_NULL, related_name="process_course")
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="process_course")
    course_title = models.CharField(max_length=50, default='')
    last_learn_date = models.DateTimeField(max_length=50, default=timezone.now)

    class Meta:
        db_table = "process_course"
        ordering = ('-created_at',)


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
