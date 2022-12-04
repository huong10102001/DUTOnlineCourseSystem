from datetime import datetime

from api_base.services import BaseService
from api_process.constants import ProcessLessonStatus
from api_report.models import AdminReport
from django.db.models import Count


class ReportService(BaseService):
    @staticmethod
    def get_total_course_by_month(course, year_query):
        course_admin_report = AdminReport.objects.all()
        total_course = [0 for i in range(12)]
        current_month = datetime.now().month
        total_course_in_month = 0
        if int(year_query) != int(datetime.now().year):
            total_course_by_month = list(course_admin_report.filter(month__year=str(year_query)).values('total_course', 'month').order_by('created_at'))
        else:
            total_course_in_month = course.filter(created_at__month=str(current_month)).count()
            total_course_by_month = list(course_admin_report.filter(month__year=str(datetime.now().year)).values('total_course', 'month').order_by('created_at'))
        for i in total_course_by_month:
            total_course[int(i['month'].strftime('%m')) - 1] = i['total_course']
        if int(year_query) == int(datetime.now().year):
            if total_course[current_month - 1] != 0:
                total_course[current_month - 1] += total_course_in_month
            else:
                total_course[current_month - 1] = total_course_in_month

        return total_course

    @staticmethod
    def get_total_user_by_month(user, year_query):
        admin_report = AdminReport.objects.all()
        total_user_list = [0 for i in range(12)]
        total_lecturer_list = [0 for i in range(12)]
        current_month = datetime.now().month
        if int(year_query) != int(datetime.now().year):
            total_user_by_month = list(admin_report.filter(month__year=str(year_query)).values('total_user', 'total_lecturer', 'month').order_by('created_at'))
        else:
            list_users = user.filter(created_at__month=str(current_month)).values('role').annotate(total=Count('role')).order_by()
            try:
                total_user = list(filter(lambda d: d['role'] == 'USER', list_users))[0]['total']
            except IndexError:
                total_user = 0
            try:
                total_lecturer = list(filter(lambda d: d['role'] == 'LECTURER', list_users))[0]['total']
            except IndexError:
                total_lecturer = 0
            total_user_by_month = list(admin_report.filter(month__year=str(datetime.now().year)).values('total_user', 'total_lecturer', 'month').order_by('created_at'))

        for i in total_user_by_month:
            total_user_list[int(i['month'].strftime('%m')) - 1] = i['total_user']
            total_lecturer_list[int(i['month'].strftime('%m')) - 1] = i['total_lecturer']
        if int(year_query) == int(datetime.now().year):
            if total_user_list[current_month - 1] != 0:
                total_user_list[current_month - 1] += total_user
            else:
                total_user_list[current_month - 1] = total_user

            if total_lecturer_list[current_month - 1] != 0:
                total_lecturer_list[current_month - 1] += total_lecturer
            else:
                total_lecturer_list[current_month - 1] = total_lecturer
        all_user = [total_user_list[i] + total_lecturer_list[i] for i in range(len(total_lecturer_list))]
        user_report = {'all_user': all_user, 'total_user': total_user_list, 'total_lecturer': total_lecturer_list}
        return user_report
