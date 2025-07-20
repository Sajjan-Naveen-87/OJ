from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Person


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True,min_length=8,style={'input_type':'password'})
    class Meta:
        model = User
        fields = ['username','email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        return user
    

class PersonSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Person
        fields = [
            'id',
            'user',
            'first_name',
            'last_name',
            'gender',
            'date_of_joining',
            'image',
            'score',
            'rank',
            'problems_attempted',
            'problems_solved',
            'about',
            'profession',
            'public_account',
            'groups_joined',
        ]
        read_only_fields = ['date_of_joining', 'rank','score','groups_joined','problems_attempted','problems_solved']

    def validate_image(self, image):
        if image and image.size > 1024 * 1024:
            raise serializers.ValidationError("Image size should not exceed 1MB.")
        return image