from api_quiz.views import QuizViewSet, QuizResultViewSet
from django.urls import path, include
from rest_framework_extensions.routers import DefaultRouter
from rest_framework_nested import routers

app_name = "api_quizzes"

router = DefaultRouter()
router.register(r'', QuizViewSet)

result_router = routers.NestedSimpleRouter(router, r'', lookup='quizzes')
result_router.register(r'results', QuizResultViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'', include(result_router.urls)),
]
