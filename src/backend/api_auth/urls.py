from rest_framework_extensions.routers import DefaultRouter
from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from api_auth.views import *

app_name = "api_auth"
router = DefaultRouter()

_urlpatterns = [
    path("login", csrf_exempt(login_view), name="login"),
    path(r"login/google", csrf_exempt(login_google_view), name="login_google"),
    path(r"registers/user", csrf_exempt(register_user), name="register_user"),
    path(r"registers/lecturer", csrf_exempt(register_lecturer), name="register_lecturer"),
]

urlpatterns = router.urls + _urlpatterns
