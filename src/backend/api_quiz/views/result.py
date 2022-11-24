from rest_framework import status
from rest_framework.response import Response

from api_base.views import BaseViewSet
from api_quiz.models import Question
from api_quiz.serializers import QuestionSerializer


class QuestionViewSet(BaseViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
