from django.contrib import admin
from django.conf.urls import include, url
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.urls import path, re_path

schema_view = get_schema_view(
    openapi.Info(
        title="DUT Online Course System API",
        default_version="v1",
        description="DUT Online Course System api documentation",
        JSON_EDITOR=True,
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    patterns=[
        path(r"api/v1/auth/", include("api_auth.urls")),
        path(r"api/v1/users/", include("api_user.urls")),
        url(r"api/v1/topics/", include('api_topic.urls')),
        url(r"api/v1/courses/", include('api_course.urls')),
        url(r"api/v1/process_course/", include('api_process.urls')),
        url(r"api/v1/report/", include('api_report.urls')),
        url(r"api/v1/notification/", include('api_notification.urls')),
    ]
)

urlpatterns = [
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r"api/v1/auth/", include('api_auth.urls')),
    url(r"api/v1/users/", include('api_user.urls')),
    url(r"api/v1/topics/", include('api_topic.urls')),
    url(r"api/v1/courses/", include('api_course.urls')),
    url(r"api/v1/process_course/", include('api_process.urls')),
    url(r"api/v1/quizzes/", include('api_quiz.urls')),
    url(r"api/v1/report/", include('api_report.urls')),
    url(r"api/v1/notification/", include('api_notification.urls')),
]
