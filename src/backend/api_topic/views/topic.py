from django.db.models import Q

from api_base.views import BaseViewSet
from api_topic.models import Topic
from api_topic.serializers import TopicSerializer


class TopicViewSet(BaseViewSet):
    queryset = Topic.objects.all()
    permission_classes = []
    serializer_class = TopicSerializer

    def list(self, request, *args, **kwargs):
        params = request.query_params
        search_query = params.get("q", "")
        res_data = Topic.objects.filter(Q(title__icontains=search_query))
        page = self.paginate_queryset(res_data)

        if page:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(res_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

