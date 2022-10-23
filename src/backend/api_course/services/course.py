from django.utils.text import slugify
from api_base.services import BaseService
from api_course.models import Course


class CourseService(BaseService):
    @classmethod
    def create_course(cls, data):
        topics = data.pop('topics')
        course_obj = Course(**data)
        course_obj.slug = slugify(f"{course_obj.title} {course_obj.id.hex[:5]}")
        course_obj.save()
        course_obj.topics.set(topics)
        return course_obj
