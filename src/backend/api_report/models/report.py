
from django.db import models
from django.utils import timezone
from api_base.models import TimeStampedModel
from api_course.models import Course


class LecturerReport(TimeStampedModel):
    date_one = models.CharField(max_length=20)
    total_user = models.BigIntegerField()
    total_cost = models.BigIntegerField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="courses")

    class Meta:
        db_table = "lecturer_report"
        ordering = ('-created_at',)


class AdminReport(TimeStampedModel):
    month = models.DateField()
    total_course = models.BigIntegerField()
    total_user = models.BigIntegerField()
    total_lecturer = models.BigIntegerField()

    class Meta:
        db_table = "admin_report"
