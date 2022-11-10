from rest_framework import serializers
from api_process.models import ProcessCourse
from api_process.serializers.process_lesson import ProcessLessonSerializer
from rest_framework.fields import UUIDField
from api_course.serializers import ChapterSerializer


class ProcessChapterSerializer(serializers.Serializer):
    status = serializers.CharField(max_length=50)
    chapter_title = serializers.CharField(max_length=50)
    chapter = ChapterSerializer(many=True)
    process_lesson = ProcessLessonSerializer(many=True)
    # process_course_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
    #                                                        allow_empty=True,
    #                                                        queryset=ProcessCourse.objects.all(),
    #                                                        pk_field=UUIDField(format='hex'),
    #                                                        source='process_course')
