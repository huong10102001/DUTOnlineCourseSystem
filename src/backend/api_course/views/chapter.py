from api_base.views import BaseViewSet
from api_course.models import Chapter, Course
from api_course.serializers import ChapterSerializer, ListChapterSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api_course.services import ChapterService


class ChapterViewSet(BaseViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'
    serializer_map = {
        "list": ListChapterSerializer
    }

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        course_id = Course.objects.get(slug=self.kwargs.get('course_slug')).id
        try:
            chapter_save = ChapterService.create_chapters(data, course_id)
            response = {'chapter': ChapterSerializer(chapter_save).data, 'message': 'Chapter created!'}
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=data, partial=True)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                response = ChapterSerializer(instance).data
                response['message'] = 'Chapter updated!'
                return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            ChapterService.delete_chapter(instance)
            response = {'message': 'Chapter Deleted!'}
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
