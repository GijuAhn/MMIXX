from django.urls import path, include
from django.conf.urls import url
from .views import *

app_name = 'music'

urlpatterns = [
    path('', MusicAPIView.as_view()),
    path('/art', ImageAPIView.as_view())
]
