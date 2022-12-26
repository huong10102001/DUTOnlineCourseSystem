from rest_framework import serializers
from api_course.models import Course, Chapter
from api_course.services import CourseService
from api_process.models import ProcessLesson, ProcessCourse
from api_process.services import ProcessCourseService, ProcessLessonService
from api_topic.models import Topic
from api_topic.serializers import TopicShortSerializer
from api_user.models import User
from rest_framework.fields import UUIDField
from api_course.serializers import ListChapterSerializer
from api_user.serializers import UserShortSerializer
from api_process.models import CourseRating
from django.db.models import Q
from django.utils.text import slugify
from certificate_package import make_certificate


class CourseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                 queryset=User.objects.all(),
                                                 pk_field=UUIDField(format='hex'),
                                                 source='user')
    topic_ids = serializers.PrimaryKeyRelatedField(required=False, write_only=True, many=True,
                                                   queryset=Topic.objects.all(), pk_field=UUIDField(format='hex'),
                                                   source='topics')
    user = UserShortSerializer(read_only=True, required=False)
    topics = TopicShortSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'summary', 'description', 'background', 'slug', 'status', 'certificate_frame', 'user', 'user_id', 'topics',
                  'topic_ids']
        extra_kwargs = {
            'description': {'required': False},
            'user': {'required': False},
            'topics': {'required': False},
            'status': {'required': False},
            'slug': {'read_only': True},
            'background': {'required': False},
            'summary': {'required': False},
            'title': {'required': False},
        }

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['create']:
            data.update({'user_id': context.request.user.user.id})
        data_res = super().to_internal_value(data)
        return data_res

    def create(self, validated_data):
        return CourseService.create_course(validated_data)

    def update(self, instance, validated_data):
        if validated_data.pop('topics') == 0:
            validated_data.pop('topics')
        if 'title' in validated_data:
            instance.slug = slugify(f"{validated_data['title']} {instance.id.hex[:5]}")
            instance.certificate_frame = make_certificate(instance, "course")
            data_res = super().update(instance, validated_data)
            return data_res
        return super().update(instance, validated_data)


class CourseRatingForListCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRating
        fields = ['id', 'title', 'content', 'star_rating', 'created_at', 'process_course_id']
        extra_kwargs = {
            'title': {'required': False},
            'user': {'required': False}
        }

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        instance['user'] = UserShortSerializer(ProcessCourse.objects.filter(id=instance['process_course_id']).first().user).data
        return instance

class ListCourseSerializer(serializers.ModelSerializer):
    user = UserShortSerializer(read_only=True, required=False)
    topics = TopicShortSerializer(many=True, read_only=True, required=False)
    chapter_ids = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, allow_empty=True, many=True,
                                                     queryset=Chapter.objects.all(),
                                                     source='chapters')
    chapters = ListChapterSerializer(many=True, required=False)
    ratings = CourseRatingForListCourseSerializer(many=True, read_only=True, required=False)
    process_status = serializers.CharField(read_only=True, required=False)
    lessons_completed = serializers.CharField(read_only=True, required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'summary', 'description', 'background', 'slug', 'status', 'user', 'topics',
                  'chapter_ids', 'chapters', 'process_status', 'lessons_completed', 'certificate_frame', 'ratings']
        extra_kwargs = {
            'description': {'required': False},
            'user': {'required': False},
            'topics': {'required': False},
            'status': {'required': False},
            'slug': {'read_only': True},
        }

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        if context.get('view') and context.get('view').action in ['list']:
            del instance['chapters']
        if context.get('view') and context.get('view').action in ['retrieve', 'slug']:
            data = instance['chapters']
            result = list(filter(lambda kq: kq['previous_chapter'] is None, data))
            if len(result) != 0:
                data.remove(result[0])
                while True:
                    chapter_next = list(filter(lambda kq: kq['previous_chapter']['id'] == result[-1]['id'], data))
                    if len(chapter_next) != 0:
                        result.append(chapter_next[0])
                        data.remove(chapter_next[0])
                        if len(data) == 0:
                            break
                    else:
                        break
                instance['chapters'] = result
        course_rating = CourseRating.objects
        rating = course_rating.filter(process_course__course__id=instance['id'])
        list_rating = list(rating.values_list('star_rating', flat=True).order_by())
        instance['ratings'] = CourseRatingForListCourseSerializer(rating, many=True).data
        instance['total_rating'] = len(list_rating)
        instance['has_user'] = ProcessCourse.objects.filter(course__id=instance['id']).count() > 0
        try:
            instance['avg_rating'] = round(sum(list_rating) / instance['total_rating'], 2)
        except ZeroDivisionError:
            instance['avg_rating'] = 0
        number_star = context.get('view').request.query_params.get("number_star", "")
        if len(number_star) != 0:
            star_rating = instance['ratings']
            number_rating = list(filter(lambda star: star['star_rating'] is int(number_star), star_rating))
            instance['ratings'] = number_rating
        try:
            instance['status_rating'] = True if len(CourseRating.objects.filter(
                Q(process_course__course_id=instance['id']) & Q(
                    process_course__user_id=str(context.get('view').request.user.user.id)))) != 0 else False
        except TypeError:
            instance['status_rating'] = False
        return instance


class ListCourseSerializerLibrary(serializers.ModelSerializer):
    user = UserShortSerializer(read_only=True, required=False)
    topics = TopicShortSerializer(many=True, read_only=True, required=False)
    ratings = CourseRatingForListCourseSerializer(many=True, read_only=True, required=False)
    process_status = serializers.CharField(read_only=True, required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'summary', 'background', 'slug', 'status', 'user', 'topics',
                  'process_status', 'ratings']
        extra_kwargs = {
            'user': {'required': False},
            'topics': {'required': False},
            'status': {'required': False},
            'slug': {'read_only': True},
        }

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        course_rating = CourseRating.objects
        rating = course_rating.filter(process_course__course__id=instance['id'])
        list_rating = list(rating.values_list('star_rating', flat=True).order_by())
        instance['total_rating'] = len(list_rating)
        instance['has_user'] = ProcessCourse.objects.filter(course__id=instance['id']).count() > 0
        try:
            instance['avg_rating'] = round(sum(list_rating) / instance['total_rating'], 2)
        except ZeroDivisionError:
            instance['avg_rating'] = 0
        number_star = context.get('view').request.query_params.get("number_star", "")
        if len(number_star) != 0:
            star_rating = instance['ratings']
            number_rating = list(filter(lambda star: star['star_rating'] is int(number_star), star_rating))
            instance['ratings'] = number_rating
        try:
            instance['status_rating'] = True if len(CourseRating.objects.filter(
                Q(process_course__course_id=instance['id']) & Q(
                    process_course__user_id=str(context.get('view').request.user.user.id)))) != 0 else False
        except TypeError:
            instance['status_rating'] = False
        return instance
