import pathlib
import uuid

from api_base.models import TimeStampedModel
from api_user.models import User
from django.db import models


def upload_path(instance, filename):
    fpath = pathlib.Path(filename)
    new_name = str(uuid.uuid1())# uuid1 -> uuid + timestamps
    return f"{instance.path}/{new_name}{fpath.suffix}"


class Attachment(TimeStampedModel):
    file = models.FileField(
        upload_to=upload_path, max_length=255, blank=False, null=True
    )
    path = models.CharField(default=None, null=True, max_length=255)
    file_type = models.CharField(max_length=255, blank=False)
    original_name = models.CharField(max_length=255, blank=False)
    length = models.IntegerField(default=0)

    class Meta:
        db_table = "attachments"
        ordering = ["-created_at"]
