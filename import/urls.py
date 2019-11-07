"""import URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
<<<<<<< HEAD
from django.conf.urls.static import static
from django.conf import settings
=======
from django.urls import include
from rest_framework import routers
from allminds import views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'therapist', views.PersonViewSet)
>>>>>>> 2f2b4ef79de29dc9e30fef2a7d1a8b3a6a20f125

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.index),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('sendEmail', views.sendEmail)
]
<<<<<<< HEAD
if settings.DEBUG:
	urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
=======

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



>>>>>>> 2f2b4ef79de29dc9e30fef2a7d1a8b3a6a20f125
