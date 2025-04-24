from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Address, Profile
from django.utils.translation import gettext_lazy as _
from django.core.files.uploadedfile import InMemoryUploadedFile

User = get_user_model()


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'country', 'postal_code', 'user', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate(self, attrs):
        required_fields = ['street', 'city', 'state', 'country', 'postal_code']
        for field in required_fields:
            if not attrs.get(field):
                raise serializers.ValidationError({field: _(f"{field.replace('_', ' ').capitalize()} is required.")})
        return attrs


class ProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False)
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'profile_picture', 'profile_picture_url', 'address', 'birth_date', 'website',
                  'social_media_links', 'is_active', 'is_verified', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'profile_picture_url']

    def get_profile_picture_url(self, obj):
        request = self.context.get('request')
        if obj.profile_picture and hasattr(obj.profile_picture, 'url'):
            return request.build_absolute_uri(obj.profile_picture.url)
        return None

    def validate_profile_picture(self, value):
        if not isinstance(value, InMemoryUploadedFile):
            raise serializers.ValidationError(_("Invalid file type."))
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError(_("File size exceeds 5MB."))
        return value

    def create(self, validated_data):
        address_data = validated_data.pop('address', None)
        profile = Profile.objects.create(**validated_data)

        if address_data:
            address_serializer = AddressSerializer(data=address_data)
            address_serializer.is_valid(raise_exception=True)
            address = address_serializer.save(user=profile.user)
            profile.address = address
            profile.save()

        return profile

    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if address_data:
            address_serializer = AddressSerializer(instance.address, data=address_data, partial=True)
            address_serializer.is_valid(raise_exception=True)
            address_serializer.save()

        return instance


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(_("Username already exists."))
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_("Email already exists."))
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not username or not password:
            raise serializers.ValidationError(_("Username and password are required."))

        return attrs
