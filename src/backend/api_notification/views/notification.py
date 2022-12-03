from api_base.views import BaseViewSet
from api_notification.models import Notification
from api_course.models import Discussion
from api_notification.serializers import NotificationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.db.models import Q


class NotificationViewSet(BaseViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path="list-notification")
    def list_notification(self, request, *args, **kwargs):
        user_obj = request.user.user
        instance = Notification.objects.filter(Q(discussion__user_id=user_obj.pk) | Q(user_reminder=user_obj.pk))
        page = self.paginate_queryset(instance)

        if page is not None:
            notification = self.get_serializer(page,  many=True).data
            number_notification = instance.filter(isRead=False).count()
            rest_data = {'list_notification': notification, 'number_notification': number_notification}
            return self.get_paginated_response(rest_data)

        notification = self.serializer_class(instance, many=True).data
        number_notification = instance.filter(isRead=False).count()
        rest_data = {'list_notification': notification, 'number_notification': number_notification}
        return Response(rest_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['put'], url_path="change-state")
    def change_state(self, request, *args, **kwargs):
        user_obj = request.user.user
        instance = Notification.objects.filter(Q(discussion__user_id=user_obj.pk) | Q(user_reminder=user_obj.pk))
        page = self.paginate_queryset(instance)
        if page is not None:
            for i in range(len(page)):
                page[i].isRead = True

            Notification.objects.bulk_update(page, ['isRead'])
            serializer = self.serializer_class(page, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
