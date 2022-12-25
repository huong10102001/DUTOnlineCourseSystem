from datetime import datetime
from django.db.models import Q
from django.utils.text import slugify
from api_base.services import BaseService
from api_course.constants import CourseStatus
from api_course.models import Course
from api_process.constants import ProcessLessonStatus, ProcessCourseStatus
from api_process.models import ProcessLesson, ProcessCourse
from api_process.services import ProcessCourseService
from api_user.constants import Roles
from reportlab.lib.pagesizes import A4
from reportlab.lib.pagesizes import landscape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from io import BytesIO
from django.core.files.base import ContentFile
from django.db.models.functions import Lower
from django.db.models import Count


class CourseService(BaseService):
    @classmethod
    def create_course(cls, data):
        topics = data.pop('topics')
        data['certificate_frame'] = CourseService.make_certificate(data)
        course_obj = Course(**data)
        course_obj.slug = slugify(f"{course_obj.title} {course_obj.id.hex[:5]}")
        course_obj.save()
        course_obj.topics.set(topics)
        return course_obj

    @classmethod
    def get_with_process(cls, user_obj, course_obj):
        from api_process.serializers import ProcessLessonSerializer

        process_lesson = ProcessLesson.objects.filter(
            Q(process_course__course_id=course_obj['id']) & Q(process_course__user_id=user_obj.id))

        if not process_lesson.exists():
            data = {
                'course_id': course_obj['id'],
                'user': user_obj
            }
            ProcessCourseService.create_process(data, course_obj)
            process_lesson = ProcessLesson.objects.filter(
                Q(process_course__course_id=course_obj['id']) & Q(process_course__user_id=user_obj.id))

        for chapter in course_obj['chapters']:
            for lesson in chapter['lessons']:
                process_lesson_item = process_lesson.filter(lesson_id=lesson['id']).first()
                lesson['status'] = \
                    process_lesson_item.status if process_lesson_item else ProcessLessonStatus.LOCK.value
                lesson['process_lesson_id'] = None if not process_lesson_item else process_lesson_item.id
                lesson['quiz_result'] = ProcessLessonSerializer(process_lesson_item).data['quiz_results']
        process_course = ProcessCourse.objects.filter(Q(course_id=course_obj['id']) & Q(user_id=user_obj.pk))
        process_course.update(last_learn_date=datetime.now())
        process = process_course.first()
        course_obj['process_status'] = process.status
        return course_obj

    @classmethod
    def get_list_process(cls, user_obj, params=None):
        ft = dict()
        ft.update({'status': CourseStatus.PUBLISHED.value})

        if params.get('title'):
            ft.update({'title__contains': params.get('title')})
        if params.get('status'):
            ft.update({'status': params.get('status')})
        if params.get('topic_ids'):
            ft.update({'topics__id__in': params.getlist('topic_ids')})

        courses = Course.objects.filter(**ft)
        process_courses = ProcessCourse.objects.filter(Q(user_id=user_obj.id)).order_by('-created_at')
        process_ids = [item[0] for item in list(process_courses.values_list('course_id'))]
        courses = courses.filter(id__in=process_ids)

        for course in courses:
            process = process_courses.filter(course_id=course.id)
            course.process_status = process[0].status
            course.lessons_completed = ProcessLesson.objects.filter(
                Q(process_course_id=process[0].id) & Q(status=ProcessLessonStatus.COMPLETED.value)).count()

        return courses

    @staticmethod
    def make_certificate(instance):
        buffer = BytesIO()
        CERTIFICATE = "CERTIFICATE.png"
        c = canvas.Canvas(buffer, pagesize=landscape(A4))
        height, width = A4
        c.drawImage(CERTIFICATE, 0, 0, width=width, height=height)
        # name
        c.setFillColor(HexColor("#024547"))
        c.setFont('Times-BoldItalic', 45, leading=None)
        c.drawCentredString(330, 310, "Pham Huu Bang")
        # course_name
        c.setFillColor(HexColor("#444440"))
        c.setFont('Courier-BoldOblique', 19, leading=None)
        c.drawCentredString(400, 235, f'"{instance["title"]}"')
        # date
        c.setFillColor(HexColor("#024547"))
        c.setFont('Times-BoldItalic', 30, leading=None)
        c.drawCentredString(230, 150, "dd-mm-yyyy")
        c.save()
        # save pdf
        file_data = ContentFile(buffer.getvalue(), name='certificate.pdf')
        buffer.close()
        return file_data

    @classmethod
    def get_list_courses(cls, user_obj, params=None):
        ft = Q(status=CourseStatus.PUBLISHED.value)

        if params.get('q'):
            ft &= Q(title_lower__contains=str(params.get('q')).strip().lower())

        courses = Course.objects.annotate(title_lower=Lower('title')).filter(ft)

        if params.getlist('categories[]'):
            topic_ids = params.getlist('categories[]')
            for topic_id in topic_ids:
                courses = courses.filter(topics__id=topic_id)

        return courses

    @classmethod
    def get_list_new_courses(cls, user_obj, params=None):
        ft = Q(status=CourseStatus.PUBLISHED.value)

        if params.get('q'):
            ft &= Q(title_lower__contains=str(params.get('q')).strip().lower())

        courses = Course.objects.annotate(title_lower=Lower('title')).filter(ft).order_by('created_at')[0:3]

        if params.getlist('categories[]'):
            topic_ids = params.getlist('categories[]')
            for topic_id in topic_ids:
                courses = courses.filter(topics__id=topic_id)

        return courses

    @classmethod
    def get_list_most_courses(cls, user_obj, params=None):
        ft = Q(status=CourseStatus.PUBLISHED.value)

        if params.get('q'):
            ft &= Q(title_lower__contains=str(params.get('q')).strip().lower())

        courses_process = ProcessCourse.objects .values('course_id').annotate(total_user=Count('user', distinct=True)).order_by('total_user').values('course_id')
        course_id = [i.get('course_id') for i in list(courses_process)[0:3]]
        courses = Course.objects.filter(id__in=course_id).filter(ft)
        if params.getlist('categories[]'):
            topic_ids = params.getlist('categories[]')
            for topic_id in topic_ids:
                courses = courses.filter(topics__id=topic_id)

        return courses

    @classmethod
    def get_list_random_courses(cls, user_obj, params=None):
        ft = Q(status=CourseStatus.PUBLISHED.value)

        if params.get('q'):
            ft &= Q(title_lower__contains=str(params.get('q')).strip().lower())

        courses = Course.objects.annotate(title_lower=Lower('title')).filter(ft).order_by('?')[0:6]
        if params.getlist('categories[]'):
            topic_ids = params.getlist('categories[]')
            for topic_id in topic_ids:
                courses = courses.filter(topics__id=topic_id)

        return courses
    @classmethod
    def get_course_management(cls, user_obj, params=None):
        ft = Q()

        if user_obj.role == Roles.LECTURER.value:
            ft &= Q(user=user_obj)

        if params.get('q'):
            ft &= Q(title_lower__contains=str(params.get('q')).strip().lower())
        if params.get('status'):
            if params.get('status') != "ALL":
                ft &= Q(status=params.get('status'))

        courses = Course.objects.annotate(title_lower=Lower('title')).filter(ft)

        if params.getlist('categories[]'):
            topic_ids = params.getlist('categories[]')
            for topic_id in topic_ids:
                courses = courses.filter(topics__id=topic_id)

        return courses
