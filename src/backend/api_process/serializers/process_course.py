from rest_framework import serializers
from api_course.models import Course
from api_process.models import ProcessCourse
from api_process.serializers import ProcessLessonSerializer
from api_process.services import ProcessCourseService
from api_user.models import User
from rest_framework.fields import UUIDField
from api_course.serializers import ListCourseSerializer, CourseSerializer
from api_user.serializers import UserShortSerializer


class ProcessCourseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                 queryset=User.objects.all(),
                                                 pk_field=UUIDField(format='hex'),
                                                 source='user')
    course_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                   allow_empty=True,
                                                   queryset=Course.objects.all(), pk_field=UUIDField(format='hex'),
                                                   source='course')
    user = UserShortSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    process_lesson = ProcessLessonSerializer(many=True, required=False)

    class Meta:
        model = ProcessCourse
        fields = ['id', 'course_title', 'status', 'last_learn_date', 'course_id', 'course', 'user', 'user_id',
                  'process_lesson']
        extra_kwargs = {
            'status': {'required': False},
            'last_learn_date': {'required': False, 'read_only': True},
            'course_title': {'required': False, 'read_only': True},
        }

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['create']:
            data.update({'user_id': context.request.user.user.id})
        return super().to_internal_value(data)

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        context = self.context.get('view')
        if context and context.action in ['list', 'create']:
            del instance['process_lesson']
        return instance

    def create(self, validated_data):
        course = ListCourseSerializer(validated_data['course']).data
        return ProcessCourseService.create_process(validated_data, course)
