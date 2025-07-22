from django.urls import path
from .views import code_review

urlpatterns = [
    path("analyze/", code_review, name='code_analyze'),
]