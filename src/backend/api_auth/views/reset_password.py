from rest_framework.response import Response
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from api_user.models import Account, User
from rest_framework import status
from django.core.mail import send_mail
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def forgot_password(request):
    data = request.data
    email = data.get('email')
    account = Account.objects.filter(email=email)
    if account.exists():
        account = account.first()
        user = User.objects.get(account_id=account.id)
        user_id = user.id
        token = PasswordResetTokenGenerator().make_token(account)
        current_site = request.META['HTTP_HOST']
        absurl = 'http://'+current_site + '/password-reset?user_id=' + str(user_id) + '&token=' + str(token)
        email_body = f'Hello {user.full_name}, \n Use link below to reset your password  \n' + str(absurl)
        send_mail(
            'Reset your passsword',
            email_body,
            'elearningpbl6@gmail.com',
            [account.email],
            fail_silently=False,
        )
    else:
        return Response({'Error': 'Your email not exists!'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'success': 'We have sent you a link to reset your password.'}, status=status.HTTP_200_OK)
