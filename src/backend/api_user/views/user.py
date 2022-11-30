from api_auth.serializers import RegisterSerializer
from api_base.views import BaseViewSet
from api_user.models import User, Account
from api_user.serializers import UserSerializer, SetNewPasswordSerializer
from rest_framework import status
from rest_framework.response import Response
from api_auth.permissions import AdminPermission, UserPermission
from rest_framework.permissions import IsAuthenticated

from api_user.services import UserService
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.decorators import action
from django.utils.encoding import DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class UserViewSet(BaseViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    permission_map = {
        "retrieve": [IsAuthenticated]
    }

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data, context=self.get_parser_context(request))
        try:
            if serializer.is_valid(raise_exception=True):
                validated_data = serializer.validated_data
                user = UserService.create_user(validated_data)
                return Response(self.serializer_class(user).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        try:
            obj_users = UserService.get_all_users()
            res_data = dict()
            for user in obj_users:
                res_data.update({user[0]: self.serializer_class(user[1], many=True).data})
            return Response(res_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path="change-password", permission_classes=[IsAuthenticated])
    def change_password(self, request, *args, **kwargs):
        user_obj = request.user.user
        account = Account.objects.filter(id=user_obj.account_id)
        if account.exists():
            account = account.first()
            if check_password(request.data["old_password"], account.password):
                account.password = make_password(request.data["new_password"])
                account.save()
                return Response({'success': True, 'message': 'Changed password successfully!'}, status=status.HTTP_200_OK)
        return Response({"details": "Incorrect username! Change password unsuccessfully."}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['put'], url_path="password-reset", permission_classes=[],
            authentication_classes=[], serializer_class=SetNewPasswordSerializer)
    def password_reset_complete(self, request, *args, **kwargs):
        user_id = request.query_params.get("user_id")
        token = request.query_params.get("token")
        data = request.data.copy()
        try:
            user = User.objects.get(id=user_id)
            account = Account.objects.get(id=user.account_id)
            data['id'] = user.account.id
            if not PasswordResetTokenGenerator().check_token(account, token):
                return Response({'error': 'Token is not valid, please request a new one'},
                                status=status.HTTP_400_BAD_REQUEST)
            serializer = self.serializer_class(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.update(data, serializer)
            return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token is not valid, please request a new one'},
                            status=status.HTTP_400_BAD_REQUEST)

