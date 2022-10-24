from rest_framework.response import Response
from api_base.views import BaseViewSet
from api_course.models import Course
from api_course.serializers import CourseSerializer, ListCourseSerializer
from rest_framework.decorators import action
from common.constants.api_constants import HttpMethod
from rest_framework import status


class CourseViewSet(BaseViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    serializer_map = {
        "list": ListCourseSerializer,
        "retrieve": ListCourseSerializer,
    }

    @action(methods=[HttpMethod.GET], detail=True, lookup_field="slug", url_path="content")
    def slug(self, request, *args, **kwargs):
        course_obj = Course.objects.filter(slug=kwargs['pk']).first()
        res_data = self.serializer_class(course_obj).data
        return Response(res_data, status=status.HTTP_200_OK)
