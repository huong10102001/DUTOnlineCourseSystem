from rest_framework import serializers

from api_quiz.models import Question, Quiz
from api_quiz.serializers import AnswerSerializer


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = ['id', 'quiz_id', 'content', 'score', 'level', 'question_type', 'order', 'answers']
        extra_kwargs = {
            'quiz': {'required': False},
            'quiz_id': {'required': False},
        }

    def to_internal_value(self, data):
        data = data.copy()
        answer_serializer = AnswerSerializer(data=data.pop('answers'), many=True)
        if answer_serializer.is_valid(raise_exception=True):
            question_validated = answer_serializer.validated_data
            data = super().to_internal_value(data)
            data.update({'answers': question_validated})
        else:
            raise Exception('Your answer is invalid')
        return data
