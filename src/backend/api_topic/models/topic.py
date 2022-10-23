from django.db import models
from api_base.models import TimeStampedModel


class Topic(TimeStampedModel):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()

    class Meta:
        db_table = "topics"
        ordering = ('-created_at',)
