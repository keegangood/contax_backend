import requests
import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from contacts.models import Contact
from contacts.serializers import ContactCreateSerializer

def generate_phone_number():
    chance = random.random()

    digits = 10
    if chance > .7:
        digits = 15
    return ''.join([str(random.randint(0,9)) for _ in range(digits)])


class Command(BaseCommand):
    help = 'Populates 10 Contacts.'

    def handle(self, *args, **options):
        user = get_user_model().objects.all().first()

        print(user)

        users = requests.get("https://jsonplaceholder.typicode.com/users").json()

        for user_data in users:
            first_name = user_data['name'].split()[0]
            last_name = user_data['name'].split()[1]

            home_phone_number = generate_phone_number()
            cell_phone_number = generate_phone_number()
            work_phone_number = generate_phone_number()
            
            email = user_data['email']
            
            contact_serializer = ContactCreateSerializer(data={
                "user":user.id,
                "first_name":first_name,
                "last_name":last_name,
                "email":email,
                "home_phone_number":home_phone_number,
                "cell_phone_number":cell_phone_number,
                "work_phone_number":work_phone_number,
            })

            if contact_serializer.is_valid():
                contact_serializer.save()
            else:
                print(contact_serializer.errors)
