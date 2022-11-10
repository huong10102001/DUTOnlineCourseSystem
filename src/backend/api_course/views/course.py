from rest_framework.response import Response
from api_base.views import BaseViewSet
from api_course.models import Course
from api_course.serializers import CourseSerializer, ListCourseSerializer
from rest_framework.decorators import action

from api_course.services import CourseService
from api_process.models import ProcessLesson
from api_process.services import ProcessCourseService, ProcessLessonService
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
        res_data = self.serializer_class(course_obj).data
        return Response(res_data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.GET], detail=True, url_path="process-retrieve")
    def process_retrieve(self, request, *args, **kwargs):
        course_obj = ListCourseSerializer(self.get_object()).data
        user_obj = request.user.user
        res_data = CourseService.get_one(user_obj, course_obj)
        return Response(res_data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.PUT], detail=True, url_path="process-update")
    def process_update(self, request, *args, **kwargs):
        data = request.data
        process_lesson_obj = ProcessLesson.objects.filter(lesson_id=data['lesson_id'],
                                                          process_course__user=request.user.user).first()
        ProcessLessonService.update_process_lesson(process_lesson_obj, status=data['status'])
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=[HttpMethod.GET], detail=False, url_path="process-list")
    def process_list(self, request, *args, **kwargs):
        user_obj = request.user.user
        params = request.query_params
        res_data = CourseService.get_list(user_obj, params)
        return Response(ListCourseSerializer(res_data, many=True, context=self.get_parser_context(request)).data,
                        status=status.HTTP_200_OK)
