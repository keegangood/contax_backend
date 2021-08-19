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

def listify_serializer_errors(serializer_errors):
    '''Return serializer errors into a list of strings'''
    errors = []
    for key in serializer_errors.keys():
        for message in serializer_errors[key]:
            # only display username exists error on user update
            if key == 'username':
                continue
            
            key=key.replace('_', ' ')
            errors.append(f"{key.capitalize()}: {message}")

    return errors


@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def contact_list(request):
    '''
    POST - create a contact
    GET  - retrieve contacts for a user
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

        # set birthday to None of not included in form data
        birthday = form_data.get('birthday')
        if birthday == '':
            form_data['birthday'] = None

        contact_serializer = ContactCreateSerializer(data=form_data)

        if contact_serializer.is_valid():

            contact = contact_serializer.save(user=user)

            response.status_code = status.HTTP_201_CREATED
            response.data = {
                'contact': ContactDetailSerializer(contact).data,
                'message': 'Contact created successfully!'
            }
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            response.data = {
                'message': listify_serializer_errors(
                    contact_serializer.errors
                )
            }

    
    return response
    


@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def contact_detail(request, contact_pk):
    '''
    GET  - get a single contact
    POST - update a contact
    '''
    response = Response()
    user = request.user

    contact = Contact.objects.filter(pk=contact_pk, user=request.user).first()

    if contact: 

        if request.method == 'GET':
            contact_serializer = ContactDetailSerializer(contact)

            response.data = {
                'contact': contact_serializer.data,
                'message': ''
            }

        elif request.method == 'POST':

            form_data = request.data['form_data']
            contact_serializer = ContactCreateSerializer(contact, data=form_data, partial=True)

            if contact_serializer.is_valid():
                contact = contact_serializer.save()
            
                response.status_code=status.HTTP_202_ACCEPTED

                response.data = {
                    'contact': ContactDetailSerializer(contact).data,
                    'message': 'Contact updated successfully!'
                }

    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        response.data = {
            'message': "Contact doesn't exist!"
        }

    return response



@api_view(['POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def contact_delete(request, contact_pk):
    '''
    POST - delete a contact
    '''
    response = Response()
    user = request.user

    contact = Contact.objects.filter(pk=contact_pk, user=request.user).first()

    if contact:
        contact.delete()

        response.status_code=status.HTTP_202_ACCEPTED
        response.data = {
            'message': 'Contact deleted successfully!'
        }
        
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        response.data = {
            'message': 'Contact does not exist' 
        }

    return response