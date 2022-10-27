from api_base.views import BaseViewSet
from api_course.models import Chapter
from api_course.serializers import ChapterSerializer, ListChapterSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api_course.services import ChapterService


class ChapterViewSet(BaseViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [IsAuthenticated]
    serializer_map = {
        "list": ListChapterSerializer
    }

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        course_id = self.kwargs.get('course_slug')
        try:
            chapter_save = ChapterService.create_chapters(data, course_id)
            response = {'chapters': ChapterSerializer(chapter_save, many=True).data, 'message': 'Chapter created!'}
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

    def list(self, request, *args, **kwargs):
        search_query = request.query_params.get("q", "")
        query_set = Chapter.objects.filter(title__icontains=search_query)
        sort_query = request.query_params.get("sort")
        if sort_query:
            try:
                if sort_query.startswith("-"):
                    Chapter._meta.get_field(sort_query[1:])
                else:
                    Chapter._meta.get_field(sort_query)
                query_set = query_set.order_by(sort_query)

            except:
                pass

        self.queryset = query_set
        return super().list(request, *args, **kwargs)
