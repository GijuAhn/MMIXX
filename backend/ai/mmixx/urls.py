"""mmixx URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view
from music import views

import music.serializers
import music.views as views

router = routers.DefaultRouter()
router.register('music', music.serializers.MusicViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # rest_framework 
    path('api-auth/', include('rest_framework.urls')),
    url('api1/doc/', get_swagger_view(title='Rest API Document')),
    url('api1/', include('music.urls')),
    # APIView 클래스를 as_view로 라우팅 -> views에서 불러와 처리함
    # url('api1/music', views.MusicAPIView.as_view()),
]
