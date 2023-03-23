from django.urls import path, include
from django.conf.urls import url
from .views import *

app_name = 'music'

urlpatterns = [
    path('mix', MusicAPIView.as_view()),
    path('mix/art', ImageAPIView.as_view())
]
