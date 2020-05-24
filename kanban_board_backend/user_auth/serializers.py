from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'profile', 'password')

    def create(self, validated_data):
        return Account.objects.create_user(request_data=validated_data)
