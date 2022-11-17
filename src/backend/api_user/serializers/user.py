from rest_framework import serializers
from api_user.models import User
from api_user.serializers import AccountSerializer
from api_process.models import ProcessCourse
from datetime import datetime


class UserProcessCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProcessCourse
        fields = ['id', 'course', 'status', 'last_learn_date', 'learn_completed_date', 'certificate']
        extra_kwargs = {
            'status': {'required': False},
            'last_learn_date': {'required': False, 'read_only': True},
            'course_title': {'required': False, 'read_only': True},
        }
        depth = 2

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        context = self.context.get('view')
        if context and context.action in ['list', 'create']:
            del instance['process_lesson']
        instance['last_learn_date'] = datetime.strptime(instance['last_learn_date'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime("%d-%m-%Y")
        instance['learn_completed_date'] = datetime.strptime(instance['learn_completed_date'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime("%d-%m-%Y") if instance['learn_completed_date'] is not None else None
        return instance


class UserSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'full_name', 'role', 'avatar', 'study_at', 'is_graduated', 'bio', 'address',
                  'phone', 'birthday', 'account']

        extra_kwargs = {
            'full_name': {'required': False},
            'avatar': {'required': False},
            'study_at': {'required': False},
            'is_graduated': {'required': False},
            'phone': {'required': False},
            'birthday': {'required': False},
        }

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        if context.get('view') and context.get('view').action in ['list', 'retrieve']:
            res_data = ProcessCourse.objects.filter(user_id=instance['id']).order_by('-learn_completed_date')
            instance["process_courses"] = UserProcessCourseSerializer(res_data, many=True).data
        return instance


class UserShortSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'full_name', 'role', 'avatar', 'bio', 'account']
