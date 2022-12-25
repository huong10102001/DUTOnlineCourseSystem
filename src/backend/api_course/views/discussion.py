from rest_framework.response import Response
from api_base.views import BaseViewSet
from api_course.models import Discussion, Course
from api_course.serializers import DiscussionSerializer, DiscussionLessonSerializer
from rest_framework import status
from api_notification.models import Notification
from rest_framework.permissions import IsAuthenticated
from api_course.services import SaveNotification


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
                    user_id = Discussion.objects.filter(id=request.data.get('parent_discussion_id')).first().user_id
                    notification = Notification(title=title, content=discussion.data['content'], user_id=user_id,
                                                user_reply=user_obj, discussion_id=discussion.data['id'])
                    data = {"title": title, "content": discussion.data['content']}
                    SaveNotification.save_notification(str(user_id), data)
                    notification.save()
                else:
                    course = Course.objects.filter(id=kwargs['course_pk']).first()
                    if (request.user.user.id != course.user.id) and (course is not None):
                        title = user_obj.full_name + " commented on your lesson."
                        notification = Notification(title=title, content=discussion.data['content'],
                                                    user=course.user,
                                                    user_reply=user_obj,
                                                    discussion_id=discussion.data['id'])
                        data = {"title": title, "content": discussion.data['content']}
                        SaveNotification.save_notification(str(course.user.id), data)
                        notification.save()
            return Response(discussion.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
