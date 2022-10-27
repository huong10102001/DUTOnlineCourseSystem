from api_base.views import BaseViewSet
from api_course.models import Lesson
from api_course.serializers import LessonSerializer, AttachmentSerializer, CreateLessonSerializer
from rest_framework import status
from rest_framework.response import Response
from api_course.services import LessonService


class LessonViewSet(BaseViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    serializer_map = {
        "create": AttachmentSerializer,
        "retrieve": LessonSerializer,
        'update': CreateLessonSerializer
    }

    def create(self, request, *args, **kwargs):
        data = request.data
        data['original_name'] = request.FILES['file'].name
        course_id = self.kwargs.get('course_slug')
        chapter_id = self.kwargs.get('chapter_pk')
        data['chapter_id'] = chapter_id
        data['path'] = "/".join(
            ['courses', str(course_id), 'Chapters', str(chapter_id)])
        lesson_serializer = CreateLessonSerializer(data=data, context=self.get_parser_context(request))
        try:
            if lesson_serializer.is_valid(raise_exception=True):
                lesson_serializer.save()
                response = lesson_serializer.data
                response['message'] = 'Lesson created!'
                return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        instance = self.get_object()
        data['original_name'] = request.FILES['file'].name
        data['chapter_id'] = self.kwargs.get('chapter_pk')
        attachment_serializer = CreateLessonSerializer(instance, data=data, partial=True, context=self.get_parser_context(request))
        try:
            if attachment_serializer.is_valid(raise_exception=True):
                self.perform_update(attachment_serializer)
                response = attachment_serializer.data
                response['message'] = 'Lesson updated!'
                return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            LessonService.delete_lesson(instance)
            response = {'message': 'Lesson Deleted!'}
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        query_set = Lesson.objects
        search_query = request.query_params.get("q", "")
        query_set = query_set.filter(title__icontains=search_query)
        sort_query = request.query_params.get("sort")
        if sort_query:
            try:
                if sort_query.startswith("-"):
                    Lesson._meta.get_field(sort_query[1:])
                else:
                    Lesson._meta.get_field(sort_query)
                query_set = query_set.order_by(sort_query)

            except:
                pass

        self.queryset = query_set
        return super().list(request, *args, **kwargs)
