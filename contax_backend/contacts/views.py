from datetime import date

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
from .serializers import ContactCreateSerializer, ContactDetailSerializer


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

    # RETRIEVE LIST OF CONTACTS
    if request.method == 'GET':

        contacts = Contact.objects.order_by('first_name').filter(user__id=user.id)

        response.data = {
            'contacts': ContactDetailSerializer(contacts, many=True).data
        }
    
    # CREATE NEW CONTACT
    elif request.method == 'POST':

        form_data = request.data.get('form_data')

        print('form_data', form_data)

        contact_serializer = ContactCreateSerializer(data=form_data)

        if contact_serializer.is_valid():

            contact = contact_serializer.save(user=user)

            response.status_code = status.HTTP_201_CREATED
            response.data = {
                "contact": contact_serializer.validated_data,
                "messages": ["Contact created successfully!"]
            }
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            response.data = {
                "messages": contact_serializer.errors
            }

    
    return response
    


@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def contact_detail(request, contact_pk):
    '''
    POST - update a contact
    GET - get a single contact
    '''
    response = Response()
    user = request.user

    contact = Contact.objects.filter(pk=contact_pk, user=request.user).first()

    contact_serializer = ContactDetailSerializer(contact)

    if contact:
        response.data = {
            'contact': contact_serializer.data,
            'message': 'Contact created successfully!'
        }
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        response.data = {
            'message': "Contact doesn't exist!"
        }

    return response