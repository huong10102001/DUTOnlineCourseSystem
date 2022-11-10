from enum import Enum


class ProcessCourseStatus(Enum):
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
