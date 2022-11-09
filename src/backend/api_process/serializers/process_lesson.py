from rest_framework import serializers
from api_course.models import Lesson, Attachment
from api_process.models import ProcessLesson
from rest_framework.fields import UUIDField
from api_course.serializers import LessonSerializer, AttachmentSerializer, ChapterSerializer, ListCourseSerializer
from api_process.services import ProcessLessonService


class ProcessLessonSerializer(serializers.ModelSerializer):
    lesson_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                   queryset=Lesson.objects.all(),
                                                   pk_field=UUIDField(format='hex'),
                                                   source='lesson')
    lesson = LessonSerializer(required=False)
    attachment_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                       queryset=Attachment.objects.all(),
                                                       pk_field=UUIDField(format='hex'),
                                                       source='attachment')
    attachment = AttachmentSerializer(required=False)

    class Meta:
        model = ProcessLesson
        fields = ['id', 'status', 'lesson_title', 'lesson', 'lesson_id', 'process_course_id',
                  'attachment', 'attachment_id']

    def to_representation(self, instance):
        return super().to_representation(instance)

    def update(self, instance, validated_data):
        return ProcessLessonService.update_process_lesson(instance, validated_data['status'])
