from api_course.models import Attachment, Lesson
from rest_framework import serializers


class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = ['id', 'file', 'file_type', 'length', 'path', 'original_name']
        extra_kwargs = {
            'path': {'write_only': True}
        }
