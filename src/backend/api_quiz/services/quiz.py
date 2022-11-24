from api_base.services import BaseService
from api_quiz.models import Quiz, Question, Answer


class QuizService(BaseService):
    @classmethod
    def create_multiple_questions(cls, quiz):
        quiz_questions = quiz.pop('questions')
        has_quiz = Quiz.objects.filter(lesson_id=quiz['lesson_id'])
        if has_quiz:
            return has_quiz.first()

        quiz = Quiz.objects.create(**quiz)
        question_arr = []
        answers_arr = []

        for question in quiz_questions:
            question.update({'quiz_id': quiz.id})
            answers = question.pop('answers')
            question = Question(**question)
            question_arr.append(question)
            for answer in answers:
                answer.update({'question': question})
                answers_arr.append(Answer(**answer))

        Question.objects.bulk_create(question_arr)
        Answer.objects.bulk_create(answers_arr)
        return quiz

    @classmethod
    def update_question(cls, instance, quiz):
        questions = quiz.pop('questions')
        Quiz.objects.filter(pk=instance.id).update(**quiz)
        created_questions_arr = []
        updated_questions_arr = []
        created_answers_arr = []
        updated_answers_arr = []
        question_ids_arr = []
        answer_ids_arr = []

        for question in questions:
            if not question.get('id'):
                question.update({'quiz': instance})
                answers = question.pop('answers')
                question = Question(**question)
                for answer in answers:
                    ans = Answer(**answer, question_id=question.id)
                    created_answers_arr.append(ans)
                    answer_ids_arr.append(ans.id)
                created_questions_arr.append(question)
                question_ids_arr.append(question.id)
                continue

            answers = question.pop('answers')
            for answer in answers:
                if not answer.get('id'):
                    ans = Answer(**answer, question_id=question['id'])
                    created_answers_arr.append(ans)
                    answer_ids_arr.append(ans.id)
                    continue
                ans1 = Answer(**answer)
                updated_answers_arr.append(ans1)
                answer_ids_arr.append(ans1.id)
            updated_questions_arr.append(Question(**question))
            question_ids_arr.append(question['id'])

        Question.objects.bulk_update(updated_questions_arr, ['content', 'score', 'order'])
        Answer.objects.bulk_update(updated_answers_arr, ['content', 'is_correct', 'order'])
        Question.objects.bulk_create(created_questions_arr)
        Answer.objects.bulk_create(created_answers_arr)

        Question.objects.filter(quiz_id=instance.id).exclude(id__in=question_ids_arr).delete()
        Answer.objects.filter(question__quiz_id=instance.id).exclude(id__in=answer_ids_arr).delete()
        return Quiz(**quiz)

