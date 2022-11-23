
from datetime import datetime

from api_base.services import BaseService
from api_course.models import Chapter
from api_process.constants import ProcessLessonStatus, ProcessCourseStatus
from api_process.models import ProcessCourse, ProcessLesson

from reportlab.lib.pagesizes import A4
from reportlab.lib.pagesizes import landscape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from io import BytesIO
from django.core.files.base import ContentFile


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
                instance.process_course.certificate = ProcessLessonService.make_certificate(instance)
                instance.process_course.learn_completed_date = datetime.now()
                instance.process_course.save()
                process_course_status = ProcessCourseStatus.COMPLETED.value
        ProcessCourse.objects.filter(id=instance.process_course_id).update(status=process_course_status)
        return instance

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
        c.drawCentredString(330, 310, instance.process_course.user.full_name)
        # course_name
        c.setFillColor(HexColor("#444440"))
        c.setFont('Courier-BoldOblique', 19, leading=None)
        c.drawCentredString(400, 235, f'"{instance.process_course.course.title}"')
        # date
        c.setFillColor(HexColor("#024547"))
        c.setFont('Times-BoldItalic', 30, leading=None)
        c.drawCentredString(230, 150, datetime.now().strftime("%d-%m-%Y"))
        c.save()
        # save pdf
        file_data = ContentFile(buffer.getvalue(),  name='certificate.pdf')
        buffer.close()
        return file_data
