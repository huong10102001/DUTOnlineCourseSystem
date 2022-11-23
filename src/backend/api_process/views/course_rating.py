from django.db.models import Q

from api_base.views import BaseViewSet
from api_process.models import CourseRating, ProcessCourse
from api_process.serializers.course_rating import CourseRatingSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class CourseRatingViewSet(BaseViewSet):
    queryset = CourseRating.objects.all()
    serializer_class = CourseRatingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, requests, *args, **kwargs):
        try:
            try:
                process_id = ProcessCourse.objects.filter(
                    Q(course_id=self.kwargs.get('course_pk')) & Q(user_id=self.request.user.user.id)).first().id
            except Exception as e:
                error = {'message': "you must enroll for the course before rating", 'error': str(e)}
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
            course_rating = CourseRating.objects.get(process_course_id=process_id)
            serialized_data = self.serializer_class(instance=course_rating)
            serialized_data.data['message'] = 'Rated'
            return Response(serialized_data.data, status=status.HTTP_200_OK,)
        except CourseRating.DoesNotExist:
            pass
        return super().create(requests, *args, **kwargs)
