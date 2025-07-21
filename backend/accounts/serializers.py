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
    image = serializers.ImageField(max_length=None, use_url=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Person
        fields ='__all__'
        read_only_fields = ['date_of_joining', 'rank','score','groups_joined','problems_attempted','problems_solved']

    def validate_image(self, value):
        valid_types = ['image/jpeg', 'image/png', 'image/jpg']
        if value.content_type not in valid_types:
            raise serializers.ValidationError("Only JPG, JPEG, and PNG images are allowed.")
        return value