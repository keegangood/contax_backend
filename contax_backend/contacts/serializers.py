from django.db import models
from rest_framework import serializers

from .models import Contact
class ContactCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields='__all__'
class ContactDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields='__all__'
        