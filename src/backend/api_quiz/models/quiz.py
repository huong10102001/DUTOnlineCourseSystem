import uuid
from django.db import models
from api_base.models import TimeStampedModel
from api_course.models import Lesson
from django.core.validators import MaxValueValidator, MinValueValidator

from api_quiz.constants import QuestionTypeConstant, Levels


class Quiz(TimeStampedModel):
    title = models.CharField(max_length=250)
    description = models.TextField()
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="quizzes")
    threshold = models.IntegerField(validators=[MinValueValidator(20), MaxValueValidator(100)], )

    class Meta:
        db_table = "quizzes"
        ordering = ('-created_at',)

    @property
    def responser(self):
        return self.lesson.chapter.course.user


class Question(TimeStampedModel):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    content = models.TextField(null=True, blank=True)
    score = models.IntegerField(default=10)
    level = models.CharField(choices=Levels.choices(), default=Levels.MEDIUM.value, max_length=50)
    question_type = models.CharField(choices=QuestionTypeConstant.choices(),
                                     default=QuestionTypeConstant.SINGLE_CHOICE.value,
                                     max_length=50)
    order = models.IntegerField(default=1)

    class Meta:
        db_table = "questions"
        ordering = ('order', 'quiz')


class Answer(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers")
    content = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    order = models.IntegerField(default=1)

    class Meta:
        db_table = "answers"
        ordering = ('order', 'question')
