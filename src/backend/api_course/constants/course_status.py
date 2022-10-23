from enum import Enum


class CourseStatus(Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    DEACTIVATE = "DEACTIVATE"

    @classmethod
    def choices(cls):
        return ((i.name, i.value) for i in cls)
