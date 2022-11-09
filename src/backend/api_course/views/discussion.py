from rest_framework.response import Response
from api_base.views import BaseViewSet
from api_course.models import Discussion
from api_course.serializers import DiscussionSerializer, DiscussionLessonSerializer


class DiscussionViewSet(BaseViewSet):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer
    serializer_map = {
        "list": DiscussionLessonSerializer,
        "retrieve": DiscussionLessonSerializer,
    }
