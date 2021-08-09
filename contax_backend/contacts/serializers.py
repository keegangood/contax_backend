from django.db import models
from rest_framework import serializers

from .models import Contact
class ContactCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields=[
            'first_name',
            'last_name',
            'email',
            'home_phone_number',
            'cell_phone_number',
            'work_phone_number',
            'birthday',
            'notes'
        ]

class ContactDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields='__all__'
        