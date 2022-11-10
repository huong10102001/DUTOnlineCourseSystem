from api_base.views import BaseViewSet
from api_process.models import ProcessLesson
from api_process.serializers import ProcessLessonSerializer
from rest_framework import status
from rest_framework.response import Response


class LessonProcessViewSet(BaseViewSet):
    queryset = ProcessLesson.objects.all()
    serializer_class = ProcessLessonSerializer

    def retrieve(self, request, *args, **kwargs):
        course_process_obj = self.serializer_class(self.get_object()).data
        return Response(course_process_obj, status=status.HTTP_200_OK)
