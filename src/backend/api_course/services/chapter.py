from api_base.services import BaseService
from api_course.models import Chapter
from django.utils.text import slugify
import string, random


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


class ChapterService(BaseService):
    @classmethod
    def create_chapters(cls, data, course_id):
        data['course_id'] = course_id
        data['slug'] = slugify(f"{data['title']} {random_string_generator(size=5)}")
        chapter_previous = list(Chapter.objects.filter(course_id=course_id).values('id', 'previous_chapter_id'))
        result = list(filter(lambda kq: kq['previous_chapter_id'] is None, chapter_previous))
        if len(result) != 0:
            chapter_previous.remove(result[0])
            while True:
                chapter_next = list(filter(lambda kq: kq['previous_chapter_id'] == result[-1]['id'], chapter_previous))
                if len(chapter_next) != 0:
                    result.append(chapter_next[0])
                    chapter_previous.remove(chapter_next[0])
                    if len(chapter_previous) == 0:
                        break
                else:
                    break
            data.update({'previous_chapter_id': result[-1]['id']})
        chapter_save = Chapter.objects.create(**data)
        return chapter_save

    @classmethod
    def delete_chapter(cls, data):
        data.previous_chapter_id = data.previous_chapter.id if data.previous_chapter is not None else None
        chapters = list(Chapter.objects.filter(course_id=data.course_id).values('id', 'previous_chapter_id'))
        chapter_previous = list(filter(lambda kq: str(kq['id']) == str(data.previous_chapter_id), chapters))
        chapter_next = list(filter(lambda kq: str(kq['previous_chapter_id']) == str(data.id), chapters))
        if len(chapter_next) != 0:
            if len(chapter_previous) == 0:
                chapter_next[0].update({'previous_chapter_id': None})
            else:
                chapter_next[0].update({'previous_chapter_id': chapter_previous[0]['id']})
            Chapter.objects.filter(id=chapter_next[0]['id']).update(**chapter_next[0])
        Chapter.objects.filter(id=data.id).delete()
