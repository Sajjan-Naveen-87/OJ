from django.urls import path
from .views import get_profile_by_username

urlpatterns = [
    path('profile/<str:username>/', get_profile_by_username, name='profile-by-username'),
]