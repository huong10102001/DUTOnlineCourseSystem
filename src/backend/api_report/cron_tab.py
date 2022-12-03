from datetime import datetime, timedelta

from django.db.models import Count
from api_course.models import Course
from api_process.models import ProcessCourse
from api_process.serializers import ProcessCourseReminderSerializer
from api_report.models import LecturerReport, AdminReport
from api_user.models import User
from django.db.models import Q
from django.core.mail import send_mail, send_mass_mail
from api_notification.models import Notification


def lecturer_report_daily():
    course_in_process = ProcessCourse.objects.filter(created_at__contains=datetime.now().strftime("%Y-%m-%d"))\
        .values('course_id').annotate(total_user=Count('user', distinct=True))
    list_course_id = list(ProcessCourse.objects.all()\
        .values_list('course_id', flat=True).order_by('course_id').distinct())
    course_report = []
    for i in course_in_process:
        course_report.append(LecturerReport(date_one=datetime.now().strftime("%d-%m-%Y"), total_user=i['total_user'],
                                            total_cost=0, course_id=i['course_id']))
        if i['course_id'] in list_course_id:
            list_course_id.remove(str(i['course_id']))
    course_report_not_user = []
    for i in list_course_id:
        course_report_not_user.append((LecturerReport(date_one=datetime.now().strftime("%d-%m-%Y"), total_user=0,
                                            total_cost=0, course_id=i)))
    LecturerReport.objects.bulk_create(course_report)
    LecturerReport.objects.bulk_create(course_report_not_user)


def admin_report_monthly():
    current_month = datetime.now().month
    course_month = Course.objects.filter(created_at__month=str(current_month)).count()
    user = User.objects
    user_month = user.filter(Q(role='USER') & Q(created_at__month=str(current_month))).count()
    lecturer_month = user.filter(Q(role='LECTURER') & Q(created_at__month=str(current_month))).count()
    AdminReport(month=datetime.now().date(), total_course=course_month,
                total_user=user_month, total_lecturer=lecturer_month).save()


def reminder_after_three_day():
    subject = 'Elearning Reminder'
    message_list = []
    notification = []
    email_from = 'elearningpbl6@gmail.com'
    course_list = ProcessCourse.objects.select_related('user').exclude(Q(user__role='ADMIN') | Q(status='COMPLETED'))\
        .filter(Q(last_learn_date__day=(datetime.now() - timedelta(days=15)).day) | Q(last_learn_date__day=(datetime.now() - timedelta(days=30)).day))
    course_process = ProcessCourseReminderSerializer(course_list, many=True).data
    for course_reminder in course_process:
        content = f'Hi {course_reminder.get("user")["full_name"]}, This is a friendly reminder from elearning that you have active courses is {course_reminder.get("course_title")} that are incomplete'
        message = (subject, content, email_from, [course_reminder.get('user').get('account')['email']])
        message_list.append(message)
        notification.append(Notification(title=subject, content=content, user_id=course_reminder.get("user")["id"], course_id=str(course_reminder.get("course"))))
    Notification.objects.bulk_create(notification)
    send_mass_mail(tuple(message_list), fail_silently=False)
