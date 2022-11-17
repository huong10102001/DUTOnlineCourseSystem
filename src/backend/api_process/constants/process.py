from enum import Enum


class ProcessCourseStatus(Enum):
    NOT_OPEN = "NOT_OPEN"
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

    @classmethod
    def choices(cls):
        return ((i.name, i.value) for i in cls)


class ProcessLessonStatus(Enum):
    LOCK = "LOCK"
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    TESTING = "TESTING"
    COMPLETED = "COMPLETED"

    @classmethod
    def choices(cls):
        return ((i.name, i.value) for i in cls)
