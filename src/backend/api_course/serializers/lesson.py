from api_course.models import Chapter, Lesson, Attachment
from rest_framework import serializers
from rest_framework.fields import UUIDField
from api_course.serializers import AttachmentSerializer, DiscussionLessonSerializer
from api_course.services import LessonService
import json


class NextLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content']
        depth = 1


class LessonSerializer(serializers.ModelSerializer):
    chapter_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True, queryset=Chapter.objects.all(),
                                                    source='chapter')
    previous_lesson = NextLessonSerializer(many=False, required=False)
    previous_lesson_id = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, allow_empty=True,
                                                            write_only=True, queryset=Lesson.objects.all(),
                                                            source='previous_lesson')

    attachment_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                       queryset=Attachment.objects.all(), source='attachment')
    attachment = AttachmentSerializer(read_only=True)
    discussions = DiscussionLessonSerializer(many=True, required=True)

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'previous_lesson', 'previous_lesson_id', 'chapter_id',
                  'chapter', 'attachment_id', 'attachment', 'slug', 'discussions']
        extra_kwargs = {
            'previous_lesson': {'required': False},
            'title': {'required': False},
            'content': {'required': False},
            'chapter': {'required': False},
        }
        depth = 1

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        if context.get('view') and context.get('view').action in ['retrieve', 'list']:
            data = instance['discussions']
            instance['total_discussion'] = len(data)
            if len(data) != 0:
                result = list(filter(lambda kq: kq['parent_discussion'] is None, data))
                instance['discussions'] = result
        return instance


class CreateLessonSerializer(serializers.ModelSerializer):
    chapter_id = serializers.PrimaryKeyRelatedField(required=False, queryset=Chapter.objects.all(),
                                                    source='chapter')

    attachment_id = serializers.PrimaryKeyRelatedField(required=False, queryset=Attachment.objects.all(),
                                                       source='attachment')
    attachment = AttachmentSerializer(required=False)
    previous_lesson = NextLessonSerializer(many=False, required=False)
    previous_lesson_id = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, allow_empty=True,
                                                            write_only=True, queryset=Lesson.objects.all(),
                                                            source='previous_lesson')

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'chapter_id', 'attachment_id', 'attachment',
                  'previous_lesson_id', 'previous_lesson', 'slug']
        depth = 1
        extra_kwargs = {
            'title': {'required': False},
            'content': {'required': False},
            'chapter': {'required': False},
            'attachment': {'required': False},
            'attachment_id': {'required': False},
            'chapter_id': {'required': False}
        }

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['update', 'create']:
            lesson = json.loads(data['lesson'])
            lesson['chapter_id'] = data['chapter_id']
            attachment = data.dict()
            lesson_serializer = NextLessonSerializer(data=lesson)
            if lesson_serializer.is_valid(raise_exception=True):
                lesson = lesson_serializer.validated_data
            data = super().to_internal_value(data)
            data.update({'lesson': lesson})
            data.update({'attachment': attachment})
        return data

    def create(self, validated_data):
        return LessonService.create_attachment(validated_data)

    def update(self, instance, validated_data):
        return LessonService.update_lesson(instance, validated_data)


class ListLessonSerializer(serializers.ModelSerializer):
    chapter_id = serializers.PrimaryKeyRelatedField(required=False, queryset=Chapter.objects.all(),
                                                    source='chapter')
    previous_lesson = NextLessonSerializer(many=False, required=False)
    previous_lesson_id = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, allow_empty=True,
                                                            write_only=True, queryset=Lesson.objects.all(),
                                                            source='previous_lesson')

    attachment_id = serializers.PrimaryKeyRelatedField(required=False, queryset=Attachment.objects.all(),
                                                       source='attachment')
    attachment = AttachmentSerializer(read_only=False)
    discussions = DiscussionLessonSerializer(many=True, required=True)

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'chapter_id', 'attachment_id', 'attachment',
                  'previous_lesson_id', 'previous_lesson', 'slug', 'discussions']
        depth = 1

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        data = instance['discussions']
        instance['total_discussion'] = len(data)
        if len(data) != 0:
            result = list(filter(lambda kq: kq['parent_discussion'] is None, data))
            instance['discussions'] = result
        return instance
