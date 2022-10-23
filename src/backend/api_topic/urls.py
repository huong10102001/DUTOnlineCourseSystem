from rest_framework_extensions.routers import DefaultRouter

from api_topic.views import TopicViewSet

app_name = "api_topic"
router = DefaultRouter()
router.register(r"", TopicViewSet)

urlpatterns = router.urls
