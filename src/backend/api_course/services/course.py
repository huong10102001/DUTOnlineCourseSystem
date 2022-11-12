from django.db.models import Q
from django.utils.text import slugify
from api_base.services import BaseService
from api_course.constants import CourseStatus
from api_course.models import Course
from api_process.constants import ProcessLessonStatus, ProcessCourseStatus
from api_process.models import ProcessLesson, ProcessCourse
from api_process.services import ProcessCourseService
from api_user.constants import Roles


class CourseService(BaseService):
    @classmethod
    def create_course(cls, data):
        topics = data.pop('topics')
        course_obj = Course(**data)
        course_obj.slug = slugify(f"{course_obj.title} {course_obj.id.hex[:5]}")
        course_obj.save()
        course_obj.topics.set(topics)
        return course_obj

    @classmethod
    def get_with_process(cls, user_obj, course_obj):
        process_lesson = \
            ProcessLesson.objects.filter(
                Q(process_course__course_id=course_obj['id']) & Q(process_course__user_id=user_obj.id))

        if not process_lesson.exists():
            data = {
                'course_id': course_obj['id'],
                'user': user_obj
            }
            ProcessCourseService.create_process(data, course_obj)
            course_obj['status'] = ProcessCourseStatus.OPEN.value
            return course_obj

        for chapter in course_obj['chapters']:
            for lesson in chapter['lessons']:
                process_lesson_item = process_lesson.filter(lesson_id=lesson['id']).first()
                lesson['status'] = \
                    process_lesson_item.status if process_lesson_item else ProcessLessonStatus.LOCK.value
                lesson['process_lesson_id'] = None if not process_lesson_item else process_lesson_item.id

        return course_obj

    @classmethod
    def get_list_process(cls, user_obj, params=None):
        ft = dict()
        if user_obj.role == Roles.USER.value:
            ft.update({'status': CourseStatus.PUBLISHED.value})
        elif user_obj.role == Roles.LECTURER.value:
            ft.update({'user': user_obj})

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
