from enum import Enum


class Roles(Enum):
    ADMIN = "ADMIN"
    LECTURER = "LECTURER"
    USER = "USER"

    @classmethod
    def choices(cls):
        return ((value.name, value.value) for value in cls)
