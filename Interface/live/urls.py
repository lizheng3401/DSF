from django.conf.urls import url
from . import views

urlpatterns=[
    url(r'^live/data', views.now, name='now'),
]