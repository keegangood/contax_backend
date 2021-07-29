# contacts/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('', views.contact_list), # [GET, POST] - create contact, retrieve contact(s)
    # path('/update', views.contact_update), # [POST]
    # path('/delete', views.contact_delete), # [POST]
    # path('/search', views.contact_search), # [POST]
]