from django.urls import path
from .views import code_review

urlpatterns = [
    path("review/", code_review),
]