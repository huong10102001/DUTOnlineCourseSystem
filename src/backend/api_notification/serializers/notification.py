from api_course.models import Lesson, Chapter, Course
from api_notification.models import Notification
from rest_framework import serializers


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ['id', 'title', 'content', 'user_reply', 'user_reminder', 'discussion', 'course', 'isRead']
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
            lesson = Lesson.objects.filter(id=instance['discussion']['lesson']).values('chapter_id', 'id').first()
            chapter = Chapter.objects.filter(id=lesson['chapter_id']).values('course_id', 'id').first()
            course = Course.objects.filter(id=chapter['course_id']).values('slug').first()
            instance['link_comment'] = '/courses/' + course['slug'] + '/chapters/' + str(chapter['id']) + '/lessons/' + str(lesson['id']) + '/'
        if instance['user_reminder'] is not None:
            course = Course.objects.filter(id=instance['course']).values('slug').first()
            instance['link_course_reminder'] = '/courses/' + course['slug'] + '/' if course['slug'] is not None else ""
        return instance
