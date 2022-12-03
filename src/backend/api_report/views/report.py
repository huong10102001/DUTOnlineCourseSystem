from datetime import datetime

from rest_framework.response import Response

from api_base.views import BaseViewSet
from api_course.models import Course
from api_report.models import LecturerReport, AdminReport
from rest_framework.decorators import action

from api_report.serializers import ReportSerializer, UserReportAdminSerializer
from api_process.models import ProcessCourse
from api_process.serializers import ProcessCourseReportSerializer
from api_report.services import ReportService
from api_user.models import User
from api_report.serializers import UserReportSerializer
from common.constants.api_constants import HttpMethod
from rest_framework import status
from django.db.models import Q
from django.db.models import Count

MONTH_LIST = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
              'November', 'December']


class ReportViewSet(BaseViewSet):
    queryset = ProcessCourse.objects.all()
    serializer_class = ProcessCourseReportSerializer

    @action(methods=[HttpMethod.GET], detail=False, url_path="lecturer-report", serializer_class=ReportSerializer)
    def lecturer_report(self, request, *args, **kwargs):
        user_obj = request.user.user
        rest_data = Course.objects.filter(Q(user__id=user_obj.pk))
        courses = self.get_serializer(rest_data, many=True).data
        total_user, total_cost = 0, 0
        total_course = rest_data.count()
        for course in courses:
            total_user += course['total_user_per_course']
            total_cost += course['total_cost_per_course']
        page = self.paginate_queryset(courses)
        if page is not None:
            ordering = request.query_params.get('ordering')
            if ordering is not None:
                try:
                    if ordering.startswith("-"):
                        ordering = ordering[1:]
                        page = sorted(page, key=lambda d: d[ordering], reverse=False)
                    else:
                        page = sorted(page, key=lambda d: d[ordering], reverse=True)
                except:
                    pass
            serializer = self.get_serializer(page, many=True).data
            data = {'total_course': total_course, 'total_user': total_user, 'total_cost': total_cost,
                    'course': serializer}
            return Response(data, status=status.HTTP_200_OK)
        data = {'total_course': total_course, 'total_user': total_user, 'total_cost': total_cost,
                'course': courses}
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.GET], detail=True, url_path="lecturer-course-report",
            serializer_class=ProcessCourseReportSerializer)
    def lecturer_course_report(self, request, *args, **kwargs):
        lecturer_report = LecturerReport.objects.filter(course__id=self.kwargs['pk'])
        date_one = lecturer_report.values_list('date_one', flat=True).order_by('date_one')
        total_user = lecturer_report.values_list('total_user', flat=True).order_by('date_one')
        total_cost = lecturer_report.values_list('total_cost', flat=True).order_by('date_one')
        report_data = {'date_one': date_one, 'total_user': total_user, 'total_cost': total_cost}
        search_query = request.query_params.get("q", "")
        rest_data = ProcessCourse.objects.filter(Q(course__id=self.kwargs['pk']) & Q(user__full_name__icontains=search_query))
        page = self.paginate_queryset(rest_data)
        if page is not None:
            ordering = request.query_params.get('ordering')
            if ordering is not None:
                try:
                    if ordering.startswith("-"):
                        ordering = ordering[1:]
                        rest_data = sorted(page, key=lambda d: getattr(d.user, ordering), reverse=False)
                    else:
                        rest_data = sorted(page, key=lambda d: getattr(d.user, ordering), reverse=True)
                except:
                    pass
            serializer = self.get_serializer(rest_data, many=True)
            report_data['users'] = serializer.data
            return self.get_paginated_response(report_data)
        users = self.get_serializer(rest_data, many=True).data
        report_data['users'] = users
        return Response(report_data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.GET], detail=False, url_path="admin-report-top-user", serializer_class=UserReportSerializer)
    def admin_report_top_user(self, request, *args, **kwargs):
        total_course = Course.objects.count()
        list_users = User.objects.values('role').annotate(total=Count('role')).order_by()
        try:
            total_user = list(filter(lambda d: d['role'] == 'USER', list_users))[0]['total']
        except IndexError:
            total_user = 0
        try:
            total_lecturer = list(filter(lambda d: d['role'] == 'LECTURER', list_users))[0]['total']
        except IndexError:
            total_lecturer = 0
        top_user = ProcessCourse.objects.exclude(learn_completed_date__isnull=True).values('user_id')\
            .annotate(total_certificate=Count('user_id')).order_by('-total_certificate')[:5]
        top_user_id = [str(x.get('user_id')) for x in top_user]
        user = User.objects.filter(id__in=top_user_id)
        user_serializer = self.get_serializer(user, many=True).data

        report_data = {'total_course': total_course, 'total_user': total_user, 'total_lecturer': total_lecturer,
                       'top_user': sorted(user_serializer, key=lambda d: d['total_certificate'], reverse=True)}
        return Response(report_data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.GET], detail=False, url_path="admin-report-course", serializer_class=ReportSerializer)
    def admin_report_course(self, request, *args, **kwargs):
        course = Course.objects
        year_query = request.query_params.get("year")
        total_course = ReportService.get_total_course_by_month(course, year_query)
        search_query = request.query_params.get("q", "")
        status_query = request.query_params.get("status", "")
        rest_data = course.filter((Q(title__icontains=search_query) | Q(user__full_name__icontains=search_query))
                                  & Q(status__icontains=status_query))
        report_data = {'month': MONTH_LIST, 'total_course': total_course}
        page = self.paginate_queryset(rest_data)
        if page is not None:
            rest_data = page
            ordering = request.query_params.get('ordering')
            if ordering is not None:
                try:
                    if ordering.startswith("-"):
                        ordering = ordering[1:]
                        rest_data = sorted(page, key=lambda d: getattr(d, ordering), reverse=False)
                    else:
                        rest_data = sorted(page, key=lambda d: getattr(d, ordering), reverse=True)
                except:
                    pass
            serializer = self.get_serializer(rest_data, many=True)
            report_data['courses'] = serializer.data
            return self.get_paginated_response(report_data)
        courses = self.get_serializer(rest_data, many=True).data
        report_data['courses'] = courses
        return Response(report_data, status=status.HTTP_200_OK)

    @action(methods=[HttpMethod.GET], detail=False, url_path="admin-report-user", serializer_class=UserReportAdminSerializer)
    def admin_report_user(self, request, *args, **kwargs):
        user = User.objects
        year_query = request.query_params.get("year")
        report_user = ReportService.get_total_user_by_month(user, year_query)
        search_query = request.query_params.get("role", "")
        user = user.filter(role__icontains=search_query)
        search_query = request.query_params.get("q", "")
        rest_data = user.filter(Q(full_name__icontains=search_query))
        report_data = {'month': MONTH_LIST}
        report_data = {**report_data, **report_user}
        page = self.paginate_queryset(rest_data)
        if page is not None:
            rest_data = page
            ordering = request.query_params.get('ordering')
            if ordering is not None:
                try:
                    if ordering.startswith("-"):
                        ordering = ordering[1:]
                        rest_data = sorted(page, key=lambda d: getattr(d, ordering), reverse=False)
                    else:
                        rest_data = sorted(page, key=lambda d: getattr(d, ordering), reverse=True)
                except:
                    pass
            serializer = self.get_serializer(rest_data, many=True)
            report_data['users'] = serializer.data
            return self.get_paginated_response(report_data)
        users = self.get_serializer(rest_data, many=True).data
        report_data['users'] = users
        return Response(report_data, status=status.HTTP_200_OK)
