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
    def get_one(cls, user_obj, course_obj):
        process_lesson = ProcessLesson.objects.filter(Q(
            processlesson__process_course__course_id=course_obj['id']) & Q(
            processlesson__process_course__user_id=user_obj.id))

        if not process_lesson.exists():
            data = {
                'course_id': course_obj['id'],
                'user': user_obj
            }
            ProcessCourseService.create_process(data, course_obj)
            course_obj['status'] = ProcessCourseStatus.OPEN.value
            return course_obj
        check_lesson_status = False
        chapter_status = ProcessLessonStatus.COMPLETED.value

        for chapter in course_obj['chapters']:
            chapter['status'] = chapter_status
            for lesson in chapter['lessons']:
                process_lesson_item = [item for item in process_lesson if item.lesson_id == lesson['id']]
                status = ProcessLessonStatus.OPEN.value if not process_lesson_item else process_lesson_item[0]['status']
                lesson['status'] = status
                lesson['process_lesson_id'] = None if not process_lesson_item else process_lesson_item[0]['id']
                if status == ProcessLessonStatus.OPEN.value or status == ProcessLessonStatus.IN_PROGRESS.value:
                    check_lesson_status = True
            if check_lesson_status:
                chapter['status'] = ProcessLessonStatus.IN_PROGRESS.value
                if chapter['lessons'][0]['status'] == ProcessLessonStatus.OPEN.value:
                    chapter['status'] = ProcessLessonStatus.OPEN.value
                check_lesson_status = False
                chapter_status = ProcessLessonStatus.LOCK.value
        return course_obj

    @classmethod
    def get_list(cls, user_obj, params=None):
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

        for course in courses:
            status = [item.status for item in process_courses if item.course_id == course.id]
            course.status = status[0] if status else ProcessLessonStatus.LOCK.value

        return courses
