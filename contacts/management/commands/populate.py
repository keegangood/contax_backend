import random
from datetime import date
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from contacts.models import Contact
from contacts.serializers import ContactCreateSerializer

from contacts.utils import set_default_contacts, generate_phone_number


class Command(BaseCommand):
    help = 'Populates 10 Contacts.'

    def handle(self, *args, **options):
        set_default_contacts()