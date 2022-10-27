from django.urls import path, include
from rest_framework_extensions.routers import DefaultRouter
from rest_framework_nested import routers
from api_course.views import CourseViewSet, ChapterViewSet, LessonViewSet

app_name = "api_course"
router = DefaultRouter()
router.register(r'', CourseViewSet)
course_router = routers.NestedSimpleRouter(router, r'', lookup='course')
course_router.register(r'chapters', ChapterViewSet)

chapter_router = routers.NestedSimpleRouter(course_router, r'chapters', lookup='chapter')
chapter_router.register(r'lessons', LessonViewSet)


# router.register(r"chapters", ChapterViewSet)
# router.register(r"lessons", LessonViewSet)
# router.register(r"", CourseViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'', include(course_router.urls)),
    path(r'', include(chapter_router.urls)),
]
