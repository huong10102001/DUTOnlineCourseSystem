from rest_framework_extensions.routers import DefaultRouter
from django.urls import path, include
from rest_framework_nested import routers

from api_process.views import CourseProcessViewSet, LessonProcessViewSet

app_name = "api_process"

router = DefaultRouter()
router.register(r'', CourseProcessViewSet)

course_process_router = routers.NestedSimpleRouter(router, r'', lookup='process_course')
course_process_router.register(r'process_lesson', LessonProcessViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'', include(course_process_router.urls)),
]
