from api_course.models import Lesson
from api_quiz.models import Quiz
from api_quiz.serializers import QuestionSerializer
from rest_framework import serializers

from api_quiz.services import QuizService


class QuizSerializer(serializers.ModelSerializer):
    lesson_id = serializers.PrimaryKeyRelatedField(required=False, queryset=Lesson.objects.all(), source='lesson')
    questions = QuestionSerializer(many=True, required=False)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'lesson_id', 'threshold', 'updated_at', 'questions']

    def to_internal_value(self, data):
        context = self.context.get('view')
        if context and context.action in ['create']:
            question_serializer = QuestionSerializer(data=data.pop('questions'), many=True, context=self.context)
            if question_serializer.is_valid(raise_exception=True):
                data.update({'questions': question_serializer.validated_data})
            else:
                raise Exception('Your question is invalid')
        return data

    def create(self, validated_data):
        return QuizService.create_multiple_questions(validated_data)

    def update(self, instance, validated_data):
        return QuizService.update_question(instance, validated_data)

    def to_representation(self, instance):
        responser = instance.responser
        instance = super().to_representation(instance)
        context = self.context
        if context.get('view') and context.get('view').action in ['retrieve'] \
                and responser and responser.account != context.get('request').user:
            questions = instance.get('questions')
            for question in questions:
                [answer.pop('is_correct') for answer in question.get('answers')]
        return instance


class QuizListSerializer(serializers.ModelSerializer):
    lesson_id = serializers.PrimaryKeyRelatedField(required=False, queryset=Lesson.objects.all(), source='lesson')

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'lesson_id', 'threshold', 'updated_at']
