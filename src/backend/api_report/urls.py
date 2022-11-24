
from rest_framework_extensions.routers import DefaultRouter
from django.urls import path, include

from api_report.views import ReportViewSet

app_name = "api_report"

router = DefaultRouter()
router.register(r'', ReportViewSet)


urlpatterns = [
    path(r'', include(router.urls))
]
