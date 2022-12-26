from rest_framework import serializers
from api_user.models import Account
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import AuthenticationFailed


class AccountSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Account
        fields = ['id', 'email', 'date_joined']


class SetNewPasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=200, write_only=True)
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'password']

    def update(self, instance, validated_data):
        try:
            password = instance.get('password')
            account_id = instance.get('id')
            account = Account.objects.get(id=account_id)
            account.password = make_password(password)
            account.save()
            return account
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)
