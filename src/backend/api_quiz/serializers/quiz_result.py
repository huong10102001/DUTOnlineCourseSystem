from rest_framework import serializers
from rest_framework.fields import UUIDField

from api_quiz.models import Answer, Question, QuizResult, Quiz
from api_quiz.serializers import QuizSerializer, QuestionSerializer
from api_quiz.services import QuizResultService
from api_user.models import User


class QuizResultSerializer(serializers.ModelSerializer):
    quiz_id = serializers.PrimaryKeyRelatedField(required=False,
                                                 queryset=Quiz.objects.all(),
                                                 pk_field=UUIDField(format='hex'),
                                                 source='quiz')
    user_id = serializers.PrimaryKeyRelatedField(required=False,
                                                 queryset=User.objects.all(),
                                                 pk_field=UUIDField(format='hex'),
                                                 source='user')
    quiz = QuizSerializer(required=False, write_only=True)

    class Meta:
        model = QuizResult
        fields = ['id', 'quiz_id', 'quiz', 'threshold', 'user_id', 'process_lesson_id', 'is_passed', 'submit_at']
        extra_kwargs = {
            'threshold': {'required': False, 'read_only': True},
            'process_lesson_id': {'required': False, 'read_only': True},
            'is_passed': {'required': False, 'read_only': True},
            'submit_at': {'required': False, 'read_only': True},
        }

    def to_representation(self, instance):
        instance = super().to_representation(instance)
        instance['score'] = instance['threshold']
        del instance['threshold']
        return instance

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['create']:
            detail = data.pop('questions')
            data = super().to_internal_value(data)
            data.update(questions=detail)

        return data
