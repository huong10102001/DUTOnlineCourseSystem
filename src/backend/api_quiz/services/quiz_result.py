from api_base.services import BaseService
from api_process.models import ProcessLesson
from api_quiz.models import QuizResult


class QuizResultService(BaseService):
    @classmethod
    def create_quiz_result(cls, quiz_result, quiz):

        existed_quiz_result = QuizResult.objects.filter(quiz_id=quiz['id'], user=quiz_result['user'])
        process_lesson = ProcessLesson.objects.filter(lesson_id=quiz['lesson_id'],
                                                      process_course__user_id=quiz_result['user'].id).first()
        if existed_quiz_result.exists():
            passed_quiz_result = existed_quiz_result.first().is_passed
            if passed_quiz_result:
                raise Exception('Only do this quiz once!')
            else:
                existed_quiz_result.delete()

        detail = quiz_result.pop('questions')
        created_quiz_result = QuizResult(**quiz_result, process_lesson_id=process_lesson.id) if process_lesson else None

        score_user = 0

        for question in quiz['questions']:
            check_question = [_item for _item in detail if
                              _item['id'].replace('-', '') == question['id'].replace('-', '')]
            if check_question:
                check_question = check_question[0]
                has_check = True
                for answer in question['answers']:
                    check_answer = [_item for _item in check_question['answers'] if
                                    _item['id'].replace('-', '') == answer['id'].replace('-', '')]
                    if check_answer and answer['is_correct'] != check_answer[0]['is_correct']:
                        has_check = False

                if has_check:
                    score_user += question['score']

        created_quiz_result.questions = detail
        created_quiz_result.threshold = score_user
        if score_user >= created_quiz_result.quiz.threshold:
            created_quiz_result.is_passed = True
        created_quiz_result.save()

        return created_quiz_result
