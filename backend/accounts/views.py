from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Person
from .serializers import UserSerializer, PersonSerializer


# Register endpoint
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Get profile by username
@api_view(['GET'])
def get_profile_by_username(request, username):
    user = get_object_or_404(User, username=username)
    person = get_object_or_404(Person, user=user)
    serializer = PersonSerializer(person)
    return JsonResponse(serializer.data)


# Update profile (including image)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request, username):
    try:
        user = User.objects.get(username=username)
        person = Person.objects.get(user=user)

        # Handle image upload if exists
        data = request.data.copy()
        if 'image' in request.FILES:
            data['image'] = request.FILES['image']

        serializer = PersonSerializer(person, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except (User.DoesNotExist, Person.DoesNotExist):
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)