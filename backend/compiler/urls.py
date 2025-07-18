from django.urls import path
from .views import compile_code, get_problem_with_samples

urlpatterns = [
    path("compile/", compile_code, name="compile-code"),
    path('get-problem/<int:id>/', get_problem_with_samples),
]