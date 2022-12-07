from rest_framework.test import APITestCase, APIRequestFactory
from django.urls import reverse
from rest_framework import status
from django.test.client import MULTIPART_CONTENT, encode_multipart, BOUNDARY
from django.core.files.base import ContentFile


class CourseListCreateTestCase(APITestCase):

    def setUp(self):
        self.list_course = reverse('api_course:course-list')
        self.create_course = reverse('api_course:course-list')
        self.id = ""

    def authenticate(self):
        response = self.client.post(
            reverse("api_auth:register_lecturer"),
            {
                "email": "bangpham+test@gmail.com",
                "password": "123456",
                "username": "bangpham",
                "full_name": "bang ph",
                "study_at": "DH BKDN"
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(
            reverse("api_auth:login"),
            {
                "email": "bangpham+test@gmail.com",
                "password": "123456",
            },
        )

        token = response.data["access_token"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_list_course(self):
        self.authenticate()
        response = self.client.get(self.list_course)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_course(self):
        self.authenticate()
        image = ContentFile(b"foo", "CERTIFICATE.png")
        response = self.client.post(path=self.create_course,
                                    data=encode_multipart(data=dict(title="course test", description="test", summary="tes ne", background=image), boundary=BOUNDARY),
                                    content_type=MULTIPART_CONTENT
                                    )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_course(self):
        self.authenticate()
        image = ContentFile(b"foo", "CERTIFICATE.png")
        response = self.client.post(path=self.create_course,
                                    data=encode_multipart(data=dict(title="course test", description="test", summary="tes ne", backeground=image), boundary=BOUNDARY),
                                    content_type=MULTIPART_CONTENT
                                    )
        self.update_course = reverse('api_course:course-detail',  kwargs={"pk": response.data['id']})
        response = self.client.put(self.update_course,
                                    {
                                        "title": "course update",
                                    }
                                   )
        print(response)
        self.assertEqual(response.data['title'], "course update")

    def test_delete_course(self):
        self.authenticate()
        image = ContentFile(b"foo", "CERTIFICATE.png")
        response = self.client.post(path=self.create_course,
                                    data=encode_multipart(data=dict(title="course test", description="test", summary="tes ne", background=image), boundary=BOUNDARY),
                                    content_type=MULTIPART_CONTENT
                                    )
        self.delete_course = reverse('api_course:course-detail',  kwargs={"pk": response.data['id']})
        response = self.client.delete(self.delete_course)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
