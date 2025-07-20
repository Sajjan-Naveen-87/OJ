from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Person
from .serializers import PersonSerializer
from django.http import JsonResponse


# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Person
from .serializers import PersonSerializer

@api_view(['GET'])
def get_profile_by_username(request, username):
    user = get_object_or_404(User, username=username)
    person = get_object_or_404(Person, user=user)
    serializer = PersonSerializer(person)
    return JsonResponse(serializer.data)