from rest_framework.response import Response
from api_base.views import BaseViewSet
from api_course.models import Discussion
from api_course.serializers import DiscussionSerializer, DiscussionLessonSerializer
from rest_framework import status
from api_notification.models import Notification
from rest_framework.permissions import IsAuthenticated


class DiscussionViewSet(BaseViewSet):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer
    serializer_map = {
        "list": DiscussionLessonSerializer,
        "retrieve": DiscussionLessonSerializer,
    }

    def create(self, request, *args, **kwargs):
        user_obj = request.user.user
        discussion = self.get_serializer(data=request.data)

        try:
            if discussion.is_valid(raise_exception=True):
                self.perform_create(discussion)
                headers = self.get_success_headers(discussion.data)
                if request.data.get('parent_discussion_id') is not None:
                    title = user_obj.full_name + " replied to your comment."
                    notification = Notification(title=title, content=discussion.data['content'], user_reply=user_obj,
                                                discussion_id=discussion.data['id'])
                    notification.save()
            return Response(discussion.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
