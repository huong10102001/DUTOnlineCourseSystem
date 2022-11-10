from api_base.views import BaseViewSet
from api_course.serializers import ListCourseSerializer
from api_process.models import ProcessCourse
from api_process.serializers import ProcessCourseSerializer
from api_process.services import ProcessCourseService
from rest_framework import status
from rest_framework.response import Response


class CourseProcessViewSet(BaseViewSet):
    queryset = ProcessCourse.objects.all()
    serializer_class = ProcessCourseSerializer

    def retrieve(self, request, *args, **kwargs):
        course_process_obj = self.serializer_class(self.get_object()).data
        course_obj = ListCourseSerializer(self.get_object().course).data
        res_data = ProcessCourseService.get_one(course_process_obj, course_obj)
        return Response(res_data, status=status.HTTP_200_OK)
