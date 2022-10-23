from rest_framework import serializers
from api_course.models import Course
from api_course.services import CourseService
from api_topic.models import Topic
from api_topic.serializers import TopicShortSerializer
from api_user.models import User
from rest_framework.fields import UUIDField

from api_user.serializers import UserShortSerializer


class CourseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                 queryset=User.objects.all(),
                                                 pk_field=UUIDField(format='hex'),
                                                 source='user')
    topic_ids = serializers.PrimaryKeyRelatedField(required=False, write_only=True, many=True, allow_null=True,
                                                   allow_empty=True,
                                                   queryset=Topic.objects.all(), pk_field=UUIDField(format='hex'),
                                                   source='topics')
    user = UserShortSerializer(read_only=True, required=False)
    topics = TopicShortSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'summary', 'description', 'background', 'slug', 'status', 'user', 'user_id', 'topics',
                  'topic_ids']
        extra_kwargs = {
            'description': {'required': False},
            'user': {'required': False},
            'topics': {'required': False},
            'status': {'required': False},
            'slug': {'read_only': True},
        }

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['create']:
            data.update({'user_id': context.request.user.user.id})
        data_res = super().to_internal_value(data)
        return data_res

    def create(self, validated_data):
        return CourseService.create_course(validated_data)
