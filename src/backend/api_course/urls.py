from rest_framework_extensions.routers import DefaultRouter

from api_course.views.course import CourseViewSet

app_name = "api_course"
router = DefaultRouter()
router.register(r"", CourseViewSet)

urlpatterns = router.urls
