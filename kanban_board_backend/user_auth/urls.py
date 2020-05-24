# coding: utf-8
from django.conf.urls import url
from user_auth.views import UserRegister, UserInfoView
from rest_framework.authtoken import views

urlpatterns = [
    url(r'^signup/$', UserRegister.as_view()),
    url(r'^login/$', views.obtain_auth_token),
    url(r'^info/$', UserInfoView.as_view())
]
