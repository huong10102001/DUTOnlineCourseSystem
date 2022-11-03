import string, random

from api_base.services import BaseService
from api_course.models import Lesson, Attachment
from django.utils.text import slugify


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


class LessonService(BaseService):
    @classmethod
    def create_attachment(cls, lesson_attachment):
        attachment = lesson_attachment.pop('attachment')
        chapter_id = attachment.pop('chapter_id')
        attachment.pop('lesson')
        attachment = Attachment.objects.create(**attachment)
        lesson = lesson_attachment.pop('lesson')
        lesson['attachment_id'] = attachment.id
        lesson['chapter_id'] = chapter_id
        lesson['slug'] = slugify(f"{lesson['title']} {random_string_generator(size=5)}")
        lessons = list(Lesson.objects.filter(chapter_id=chapter_id).values('id', 'previous_lesson_id'))
        result = list(filter(lambda kq: kq['previous_lesson_id'] is None, lessons))
        if len(result) != 0:
            lessons.remove(result[0])
            while True:
                lesson_next = list(filter(lambda kq: kq['previous_lesson_id'] == result[-1]['id'], lessons))
                if len(lesson_next) != 0:
                    result.append(lesson_next[0])
                    lessons.remove(lesson_next[0])
                    if len(lessons) == 0:
                        break
                else:
                    break
            lesson.update({'previous_lesson_id': result[-1]['id']})
        lesson = Lesson.objects.create(**lesson)
        return lesson

    @classmethod
    def update_lesson(cls, instance, lesson_attachment):
        lesson = lesson_attachment.pop('lesson')
        Lesson.objects.filter(pk=instance.id).update(**lesson)
        attachment = lesson_attachment.pop('attachment')
        chapter_id = attachment.pop('chapter_id')
        attachment.pop('lesson')
        if 'file' in attachment.keys():
            attachment.pop('file')
        Attachment.objects.filter(pk=instance.attachment_id).update(**attachment)
        lesson['attachment_id'] = instance.attachment_id
        lesson['chapter_id'] = chapter_id
        return Lesson(id=instance.id, **lesson)

    @classmethod
    def delete_lesson(cls, data):
        data.previous_lesson_id = data.previous_lesson.id if data.previous_lesson is not None else None
        lessons = list(Lesson.objects.filter(chapter_id=data.chapter_id).values('id', 'previous_lesson_id'))
        lesson_previous = list(filter(lambda kq: str(kq['id']) == str(data.previous_lesson_id), lessons))
        lesson_next = list(filter(lambda kq: str(kq['previous_lesson_id']) == str(data.id), lessons))
        if len(lesson_next) != 0:
            if len(lesson_previous) == 0:
                lesson_next[0].update({'previous_lesson_id': None})
            else:
                lesson_next[0].update({'previous_lesson_id': lesson_previous[0]['id']})
            Lesson.objects.filter(id=lesson_next[0]['id']).update(**lesson_next[0])
        Lesson.objects.filter(id=data.id).delete()
        Attachment.objects.filter(id=data.attachment.id).delete()

