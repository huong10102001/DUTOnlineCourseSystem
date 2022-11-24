from rest_framework import serializers
from rest_framework.fields import UUIDField

from api_quiz.models import Answer, Question


class AnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.PrimaryKeyRelatedField(required=False, write_only=True,
                                                     queryset=Question.objects.all(),
                                                     pk_field=UUIDField(format='hex'),
                                                     source='question')

    class Meta:
        model = Answer
        fields = ['id', 'question_id', 'content', 'is_correct', 'order']
        extra_kwargs = {
            'question': {'required': False},
        }
