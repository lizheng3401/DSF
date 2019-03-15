from django.conf.urls import url
from . import views
from django.views.generic import TemplateView

urlpatterns=[
    url(r'^live/data', views.now, name='now'),
]
