from rest_framework_extensions.routers import DefaultRouter

from api_notification.views import NotificationViewSet

app_name = "api_notification"
router = DefaultRouter()
router.register(r"", NotificationViewSet)

urlpatterns = router.urls
