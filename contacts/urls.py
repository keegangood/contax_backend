# contacts/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('', views.contact_list), # [GET, POST] - create contact, retrieve contact(s)
    path('detail/<int:contact_pk>', views.contact_detail), # [GET, POST] - get/update single contact
    path('delete/<int:contact_pk>', views.contact_delete), # [POST] - delete contact
]