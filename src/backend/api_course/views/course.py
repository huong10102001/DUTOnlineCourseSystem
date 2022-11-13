from rest_framework.response import Response
from api_base.views import BaseViewSet
from api_course.models import Course
from api_course.serializers import CourseSerializer, ListCourseSerializer
from rest_framework.decorators import action

from api_course.services import CourseService
from api_process.services import ProcessCourseService
from common.constants.api_constants import HttpMethod
from rest_framework import status


class CourseViewSet(BaseViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    serializer_map = {
        "list": ListCourseSerializer,
        "retrieve": ListCourseSerializer,
    }

    @action(methods=[HttpMethod.GET], detail=True, lookup_field="slug", url_path="content",
            serializer_class=ListCourseSerializer)
    def slug(self, request, *args, **kwargs):
        course_obj = Course.objects.filter(slug=kwargs['pk']).first()
        user_obj = request.user.user
        res_data = CourseService.get_one(user_obj, course_obj)
        return Response(res_data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        course_obj = ListCourseSerializer(self.get_object()).data
        user_obj = request.user.user
        res_data = CourseService.get_one(user_obj, course_obj)
        return Response(res_data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        user_obj = request.user.user
        params = request.query_params
        res_data = CourseService.get_list(user_obj, params)
        return Response(ListCourseSerializer(res_data, many=True, context=self.get_parser_context(request)).data,
                        status=status.HTTP_200_OK)
