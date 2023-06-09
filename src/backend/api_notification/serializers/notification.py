from api_course.models import Lesson, Chapter, Course
from api_notification.models import Notification
from rest_framework import serializers
from django.utils.timesince import timesince
from datetime import datetime


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ['id', 'title', 'content', 'user_reply', 'user', 'discussion', 'course_id', 'isRead']
        extra_kwargs = {
            'user_reply': {'required': False},
            'discussion': {'required': False},
            'user_reminder': {'required': False},
            'course': {'required': False}
        }
        depth = 1

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        if instance['discussion'] is not None:
            lesson = Lesson.objects.filter(id=instance['discussion']['lesson']).values('chapter_id', 'slug').first()
            chapter = Chapter.objects.filter(id=lesson['chapter_id']).values('course_id', 'slug').first()
            course = Course.objects.filter(id=chapter['course_id']).values('slug').first()
            instance['link_comment'] = '/courses/' + course['slug'] + '/chapters/' + str(chapter['slug']) + '/lessons/' + str(lesson['slug']) + '/'
            instance['time_comment'] = timesince(datetime.strptime(instance['discussion']['created_at'], '%Y-%m-%dT%H:%M:%S.%f%z'))
        if instance['course_id'] is not None:
            course = Course.objects.filter(id=instance['course_id']).values('slug').first()
            instance['link_course_reminder'] = '/courses/' + course['slug'] + '/' if course['slug'] is not None else ""
        return instance
