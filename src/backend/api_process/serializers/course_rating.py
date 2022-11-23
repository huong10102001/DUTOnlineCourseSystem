from django.db.models import Q
from rest_framework import serializers

from api_process.models import CourseRating, ProcessCourse
from api_user.serializers import UserShortSerializer


class CourseRatingSerializer(serializers.ModelSerializer):

    user = UserShortSerializer(read_only=True, required=False)

    class Meta:
        model = CourseRating
        fields = ['id', 'title', 'content', 'star_rating', 'created_at', 'user', 'process_course_id']
        extra_kwargs = {
            'title': {'required': False},
            'user': {'required': False},
        }

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['create', 'update']:
            process_id = ProcessCourse.objects.filter(Q(course_id=context.kwargs.get('course_pk'))
                                                      & Q(user_id=context.request.user.user.id)).first().id
            data.update({'process_course_id': process_id})
        return data
