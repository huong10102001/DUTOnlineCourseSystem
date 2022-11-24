from api_base.views import BaseViewSet
from api_quiz.models import Answer
from api_quiz.serializers import AnswerSerializer


class AnswerViewSet(BaseViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
