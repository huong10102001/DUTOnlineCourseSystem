from rest_framework_extensions.routers import DefaultRouter

from api_user.views import UserViewSet

app_name = "api_user"
router = DefaultRouter()
router.register(r"", UserViewSet)

urlpatterns = router.urls
