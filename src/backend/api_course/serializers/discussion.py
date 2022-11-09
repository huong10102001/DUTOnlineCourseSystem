import django
from django.utils.timesince import timesince

from api_course.models import Discussion, Lesson
from api_user.models import User
from rest_framework import serializers
from rest_framework.fields import UUIDField
from api_user.serializers import UserShortSerializer
from datetime import datetime


class NextDiscussionSerializer(serializers.ModelSerializer):
    user = UserShortSerializer(read_only=True, required=False)

    class Meta:
        model = Discussion
        fields = ['id', 'content', 'user', 'created_at']

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        instance['time_comment'] = timesince(datetime.strptime(instance['created_at'], '%Y-%m-%dT%H:%M:%S.%f%z'))
        return instance


class DiscussionSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                 queryset=User.objects.all(),
                                                 pk_field=UUIDField(format='hex'),
                                                 source='user')
    user = UserShortSerializer(read_only=True, required=False)
    lesson_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                   queryset=Lesson.objects.all(), source='lesson')
    parent_discussion = NextDiscussionSerializer(required=False)
    parent_discussion_id = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, allow_empty=True,
                                                              write_only=True, queryset=Discussion.objects.all(),
                                                              source='parent_discussion')

    class Meta:
        model = Discussion
        fields = ['id', 'content', 'user', 'user_id', 'lesson_id', 'parent_discussion',
                  'parent_discussion_id']

        extra_kwargs = {
            'user': {'required': False},
        }

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['create']:
            data.update({'lesson_id': context.kwargs['lesson_pk']})
            data.update({'user_id': context.request.user.user.id})
        data_res = super().to_internal_value(data)
        return data_res


class DiscussionLessonSerializer(serializers.ModelSerializer):
    child_discussions = NextDiscussionSerializer(many=True)
    user = UserShortSerializer(read_only=True, required=False)

    class Meta:
        model = Discussion
        fields = ['id', 'content', 'parent_discussion', 'user', 'child_discussions', 'created_at']

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        # if context.get('view') and context.get('view').action in ['retrieve', 'list']:
        if len(instance['child_discussions']) != 0:
            instance['child_discussions'] = sorted(instance['child_discussions'], key=lambda d: d['created_at'])
        instance['time_comment'] = timesince(datetime.strptime(instance['created_at'], '%Y-%m-%dT%H:%M:%S.%f%z'))
        return instance
