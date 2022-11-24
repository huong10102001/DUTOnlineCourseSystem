from rest_framework import serializers
from api_course.models import Course, Discussion
from api_course.serializers import CourseSerializer
from api_process.models import ProcessCourse
from api_report.models import LecturerReport, AdminReport
from api_user.models import User
from api_user.serializers import UserShortSerializer, AccountSerializer
from django.db.models import Count


class LecturerReportSerializer(serializers.ModelSerializer):

    course = CourseSerializer(read_only=True)

    class Meta:
        model = LecturerReport
        fields = ['id', 'date_one', 'total_user', 'total_cost', 'course']


class AdminReportSerializer(serializers.ModelSerializer):

    course = CourseSerializer(read_only=True)

    class Meta:
        model = AdminReport
        fields = ['id', 'month', 'total_course', 'total_user', 'total_lecturer']


class ReportCourseSerializer(serializers.ModelSerializer):
    user = UserShortSerializer(read_only=True)

    class Meta:
        model = ProcessCourse
        fields = ['id', 'user']


class ReportSerializer(serializers.ModelSerializer):
    user = UserShortSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'summary', 'user', 'slug', 'status', 'cost', 'created_at']

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        user = ProcessCourse.objects.filter(course__id=instance['id']).values('user').count()
        instance['total_user_per_course'] = user
        instance['total_cost_per_course'] = user * instance['cost']
        return instance


class UserReportSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'full_name', 'role', 'avatar', 'bio', 'account']

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        user_process = ProcessCourse.objects.exclude(learn_completed_date__isnull=True).filter(user_id=instance['id'])\
            .values('user_id').annotate(total_certificate=Count('user_id')).order_by()
        instance['total_certificate'] = user_process[0]['total_certificate']
        user_discussion = Discussion.objects.filter(user_id=instance['id'])\
            .values('user_id').annotate(total_answer=Count('user_id')).order_by()
        if len(user_discussion) != 0:
            instance['total_answer'] = user_discussion[0]['total_answer']
        else:
            instance['total_answer'] = 0
        return instance


class UserReportAdminSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'full_name', 'role', 'avatar', 'bio', 'account']

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        process_course = ProcessCourse.objects
        user_process = process_course.exclude(learn_completed_date__isnull=True).filter(user_id=instance['id']) \
            .values('user_id').annotate(total_certificate=Count('user_id')).order_by()
        try:
            instance['total_certificate'] = user_process[0]['total_certificate']
        except IndexError:
            instance['total_certificate'] = 0
        user_discussion = Discussion.objects.filter(user_id=instance['id'])\
            .values('user_id').annotate(total_answer=Count('user_id')).order_by()
        try:
            instance['total_answer'] = user_discussion[0]['total_answer']
        except IndexError:
            instance['total_answer'] = 0
        instance['total_course_apply'] = process_course.filter(user_id=instance['id']).count()
        instance['total_course_of_lecturer'] = Course.objects.filter(user_id=instance['id']).count()
        return instance
