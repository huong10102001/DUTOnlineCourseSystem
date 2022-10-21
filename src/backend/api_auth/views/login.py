from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from drf_yasg import openapi
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from google.oauth2 import id_token
import google.auth.transport.requests

from api_auth.serializers import RegisterSerializer
from api_auth.services import AccountService
from api_user.models import Account, User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@swagger_auto_schema(method='POST', request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'email': openapi.Schema(type=openapi.TYPE_STRING, description='Type your email', default='admin@gmail.com'),
        'password': openapi.Schema(type=openapi.TYPE_STRING, description='Type your password', default='123456'),
    })
 )
@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def login_view(request):
    password = request.data.get("password")
    email = request.data.get("email")
    account = Account.objects.filter(Q(email=email))
    if account.exists():
        account = account.first()
        if check_password(password, account.password):
            token = RefreshToken.for_user(account)
            response = {'email': account.email, 'access_token': str(token.access_token),
                        'refresh_token': str(token)}
            return Response(response)

        return Response({"details": "Invalid username/password"}, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='POST', request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'access_token': openapi.Schema(type=openapi.TYPE_STRING, description='Access Token'),
    })
 )
@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def login_google_view(request):
    try:
        token = request.data.get('access_token')
        request = google.auth.transport.requests.Request()
        user_data = id_token.verify_oauth2_token(token, request)
        if user_data['email_verified']:
            account_obj = {
                "email": user_data["email"],
                "google_login": True,
            }
            profile_obj = {
                "full_name": f'{user_data["family_name"]} {user_data["given_name"]}',
                "avatar": user_data['picture']
            }
            user = AccountService.login_with_google(account_obj, profile_obj)
            token = RefreshToken.for_user(user)
            response = {
                'email': account_obj['email'],
                'role': user.role,
                'access_token': str(token.access_token),
                'refresh_token': str(token)
            }
            return Response(response)
    except Exception as e:
        return Response({"error": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
