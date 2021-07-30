from django.shortcuts import render

from django.contrib.auth import get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import (
    api_view, permission_classes,
    authentication_classes
)

from users.authentication import SafeJWTAuthentication

from .models import Contact
from .serializers import ContactDetailSerializer

@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def contact_list(request):
    '''
    POST - create a contact
    GET - retrieve all contacts for a user
    '''
    response = Response()

    user = request.user

    contacts = Contact.objects.filter(user__id=user.id)

    response.data = {
        'contacts': ContactDetailSerializer(contacts, many=True).data
    }

    return response
    