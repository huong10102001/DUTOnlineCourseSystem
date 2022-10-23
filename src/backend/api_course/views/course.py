from api_base.views import BaseViewSet
from api_course.models import Course
from api_course.serializers import CourseSerializer


class CourseViewSet(BaseViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'slug'
