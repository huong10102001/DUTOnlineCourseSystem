from api_base.services import BaseService
from api_course.models import Chapter
from api_process.constants import ProcessLessonStatus, ProcessCourseStatus
from api_process.models import ProcessCourse, ProcessLesson


class ProcessLessonService(BaseService):
    @classmethod
    def update_process_lesson(cls, instance, status):
        instance.status = status
        process_course_status = ProcessCourseStatus.IN_PROGRESS.value
        instance.save()
        if status == ProcessLessonStatus.COMPLETED.value:
            next_lesson = ProcessLesson.objects.filter(previous_process_lesson_id=instance.id).first()
            if next_lesson:
                next_lesson.status = ProcessLessonStatus.OPEN.value
                next_lesson.save()
            else:
                process_course_status = ProcessCourseStatus.COMPLETED.value
        ProcessCourse.objects.filter(id=instance.process_course_id).update(status=process_course_status)
        return instance
