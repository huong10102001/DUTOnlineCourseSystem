from api_course.models import Chapter, Course
from api_course.serializers import ListLessonSerializer
from rest_framework import serializers


class NextChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title']
        depth = 1


class ChapterSerializer(serializers.ModelSerializer):
    course_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True, queryset=Course.objects.all(),
                                                   source='course')
    previous_chapter = NextChapterSerializer(required=False)
    previous_chapter_id = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, allow_empty=True,
                                                             write_only=True, queryset=Chapter.objects.all(),
                                                             source='previous_chapter')

    class Meta:
        model = Chapter
        fields = ['id', 'title', 'previous_chapter_id', 'previous_chapter',
                  'course_id', 'slug']
        extra_kwargs = {
            'title': {'required': False},
            'course': {'required': False}
        }
        depth = 1


class ListChapterSerializer(serializers.ModelSerializer):
    course_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True, queryset=Course.objects.all(),
                                                   source='course')
    lessons = ListLessonSerializer(many=True, required=False)
    previous_chapter = NextChapterSerializer(required=False)
    previous_chapter_id = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, allow_empty=True,
                                                             write_only=True, queryset=Chapter.objects.all(),
                                                             source='previous_chapter')

    class Meta:
        model = Chapter
        fields = ['id', 'title', 'lessons', 'previous_chapter_id', 'previous_chapter',
                  'course_id', 'slug']
        extra_kwargs = {
            'title': {'required': False},
            'course': {'required': False}
        }
        depth = 1

    def to_representation(self, instance):
        context = self.context
        instance = super().to_representation(instance)
        if context.get('view') and context.get('view').action in ['retrieve', 'list']:
            data = instance['lessons']
            if len(data) != 0:
                result = list(filter(lambda kq: kq['previous_lesson'] is None, data))
                data.remove(result[0])
                while True:
                    lesson_next = list(filter(lambda kq: kq['previous_lesson']['id'] == result[-1]['id'], data))
                    if len(lesson_next) != 0:
                        result.append(lesson_next[0])
                        data.remove(lesson_next[0])
                        if len(data) == 0:
                            break
                    else:
                        break
                instance['lessons'] = result
        return instance
