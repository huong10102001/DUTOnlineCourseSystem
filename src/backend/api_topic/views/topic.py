from api_base.views import BaseViewSet
from api_topic.models import Topic
from api_topic.serializers import TopicSerializer


class TopicViewSet(BaseViewSet):
    queryset = Topic.objects.all()
    permission_classes = []
    serializer_class = TopicSerializer
