from rest_framework import status
from rest_framework.response import Response

from api_base.views import BaseViewSet
from api_quiz.models import QuizResult
from api_quiz.serializers import QuizSerializer
from api_quiz.serializers.quiz_result import QuizResultSerializer
from api_quiz.services import QuizResultService


class QuizResultViewSet(BaseViewSet):
    serializer_class = QuizResultSerializer
    queryset = QuizResult.objects.all()

    def create(self, request, quizzes_pk=None, *args, **kwargs):
        data = request.data.copy()
        data['quiz_id'] = quizzes_pk if quizzes_pk else None
        data['user_id'] = request.user.user.id

        serializer = QuizResultSerializer(data=data, context=self.get_parser_context(request))
        try:
            if serializer.is_valid(raise_exception=True):
                validated_data = serializer.validated_data
                quiz = QuizSerializer(validated_data['quiz']).data
                res_data = QuizResultService.create_quiz_result(validated_data, quiz)
                return Response(QuizResultSerializer(res_data).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
