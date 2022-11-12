from api_base.services import BaseService
from api_process.constants import ProcessLessonStatus
from api_process.models import ProcessCourse, ProcessLesson


class ProcessCourseService(BaseService):
    @classmethod
    def get_one(cls, validate_data, course_obj):
        process_lesson = validate_data['process_lesson']
        check_lesson_status = False
        chapter_status = ProcessLessonStatus.COMPLETED.value

        for chapter in course_obj['chapters']:
            chapter['status'] = chapter_status
            for lesson in chapter['lessons']:
                process_lesson_item = [item for item in process_lesson if item['lesson']['id'] == lesson['id']]
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
    def create_process(cls, data, course_obj):
        check_process = ProcessCourse.objects.filter(**data)

        if check_process.exists():
            return check_process.last()

        previous_process_lesson = None
        course = {
            'course_id': course_obj['id'],
            'course_title': course_obj['title'],
            'user_id': data['user'].id,
        }

        process_course = ProcessCourse(**course)
        process_lesson_arr = []
        first_lesson = True

        for chapter in course_obj['chapters']:
            for lesson in chapter['lessons']:
                process_lesson = {
                    'lesson_id': lesson['id'],
                    'attachment_id': lesson['attachment_id'],
                    'lesson_title': lesson['title'],
                    'process_course': process_course,
                    'previous_process_lesson': previous_process_lesson
                }

                if first_lesson:
                    process_lesson.update({'status': ProcessLessonStatus.OPEN.value})
                    first_lesson = False

                previous_process_lesson = ProcessLesson(**process_lesson)
                process_lesson_arr.append(previous_process_lesson)

        process_course.save()
        ProcessLesson.objects.bulk_create(process_lesson_arr)

        return process_course
