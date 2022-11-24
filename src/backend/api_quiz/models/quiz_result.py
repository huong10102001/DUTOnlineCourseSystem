from django.db import models
from api_base.models import TimeStampedModel
from django.core.validators import MaxValueValidator, MinValueValidator
from api_process.models import ProcessLesson
from django.utils import timezone

from api_quiz.models import Quiz
from api_user.models import User


class QuizResult(TimeStampedModel):
    quiz = models.ForeignKey(Quiz, related_name="quiz_results", blank=True, null=True, on_delete=models.SET_NULL)
    threshold = models.IntegerField(validators=[MinValueValidator(20), MaxValueValidator(100)], )
    user = models.ForeignKey(User, related_name="quiz_results", on_delete=models.CASCADE)
    process_lesson = models.ForeignKey(ProcessLesson, related_name="quiz_results", blank=True, null=True,
                                       on_delete=models.SET_NULL)
    is_passed = models.BooleanField(default=False)
    submit_at = models.DateTimeField(default=timezone.now)
    CREATE_AT_FIELD = "submit_at"

    class Meta:
        db_table = "quiz_results"
        ordering = ('-submit_at',)

    @property
    def quiz_title(self):
        return self.quiz.title

    @property
    def user_name(self):
        return self.user.full_name
