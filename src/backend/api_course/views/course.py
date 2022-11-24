from rest_framework.response import Response
from api_base.views import BaseViewSet
from api_course.models import Course
from api_course.serializers import CourseSerializer, ListCourseSerializer
from rest_framework.decorators import action
from api_course.services import CourseService
from api_process.constants import ProcessCourseStatus
from api_process.models import ProcessLesson, ProcessCourse
from api_process.serializers import ProcessCourseSerializer
from api_process.services import ProcessLessonService
from common.constants.api_constants import HttpMethod
from rest_framework import status
from django.db.models import Q


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
        res_data = self.serializer_class(course_obj, context=self.get_parser_context(request)).data

        if request.user is not None:
            user_obj = request.user.user
            process_course = ProcessCourse.objects.filter(
                Q(course_id=res_data['id']) & Q(user_id=user_obj.pk)).order_by('-created_at').first()
            res_data['process_status'] = process_course.status if process_course else ProcessCourseStatus.NOT_OPEN.value

        return Response(res_data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.GET], detail=True, url_path="process-retrieve")
    def process_retrieve(self, request, *args, **kwargs):
        course_obj = ListCourseSerializer(self.get_object(), context=self.get_parser_context(request)).data
        user_obj = request.user.user
        res_data = CourseService.get_with_process(user_obj, course_obj)
        process_course = ProcessCourse.objects.filter(Q(course_id=self.kwargs['pk']) & Q(user_id=user_obj.pk)).order_by(
            '-created_at').first()
        process_course = ProcessCourseSerializer(process_course).data
        res_data['user_certificate'] = process_course['certificate']
        return Response(res_data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.PUT], detail=True, url_path="process-update")
    def process_update(self, request, *args, **kwargs):
        data = request.data
        process_lesson_obj = ProcessLesson.objects.filter(lesson_id=data['lesson_id']).first()
        ProcessLessonService.update_process_lesson(process_lesson_obj, status=data['status'])
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=[HttpMethod.GET], detail=False, url_path="process-list", serializer_class=ListCourseSerializer)
    def process_list(self, request, *args, **kwargs):
        user_obj = request.user.user
        params = request.query_params
        res_data = CourseService.get_list_process(user_obj, params)

        page = self.paginate_queryset(res_data)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(res_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.GET], detail=True, url_path="certificate", serializer_class=ProcessCourseSerializer)
    def certificate(self, request, *args, **kwargs):
        user_obj = request.user.user
        res_data = ProcessCourse.objects.filter(Q(course__slug=self.kwargs['pk']) & Q(user_id=user_obj.pk)).order_by(
            '-created_at').first()
        serializer = self.get_serializer(res_data)
        return Response(serializer.data, status=status.HTTP_200_OK)
