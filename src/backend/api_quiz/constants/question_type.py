from enum import Enum


class QuestionTypeConstant(Enum):
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE"
    SINGLE_CHOICE = "SINGLE_CHOICE"

    @classmethod
    def choices(cls):
        return ((i.name, i.value) for i in cls)


class Levels(Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

    @classmethod
    def choices(cls):
        return ((i.name, i.value) for i in cls)
