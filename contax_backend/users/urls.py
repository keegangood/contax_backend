# users/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('', views.register), # create
    path('auth/', views.auth), # get logged in user
    path('login/', views.login), # login user
    path('token/', views.extend_token), # request new access tokens
    path('<int:pk>/', views.user_detail), # read/update
    path('logout/', views.logout), # delete tokens
]