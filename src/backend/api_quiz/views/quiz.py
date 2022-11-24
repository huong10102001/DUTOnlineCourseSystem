from rest_framework import status
from rest_framework.response import Response

from api_base.views import BaseViewSet
from api_quiz.models import Quiz
from api_quiz.serializers import QuizSerializer, QuizListSerializer


class QuizViewSet(BaseViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
    serializer_map = {
        "list": QuizListSerializer
    }

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        quiz_serializer = QuizSerializer(data=data, context=self.get_parser_context(request))
        try:
            if quiz_serializer.is_valid(raise_exception=True):
                quiz_serializer.save()
                res_data = quiz_serializer.data
                return Response(res_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
