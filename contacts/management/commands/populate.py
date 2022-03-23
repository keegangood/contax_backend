import requests
import random
from datetime import date
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from contacts.models import Contact
from contacts.serializers import ContactCreateSerializer

def generate_phone_number():
    chance_of_existing = random.random()

    if chance_of_existing < .3:
        phone_number = None
    else:
        digits = 10

        # digit_chance = random.random()
        # if chance > .7:
            # for international numbers
            #     digits = 15

        phone_number = ''.join([str(random.randint(0,9)) for _ in range(digits)])

    return phone_number

class Command(BaseCommand):
    help = 'Populates 10 Contacts.'

    def handle(self, *args, **options):
        fake = Faker()
        user, created = get_user_model().objects.get_or_create(
            email='guest@contax.com',
            password='pass3412'
        )

        if created:
            user.set_password(user.password)

        users = requests.get("https://jsonplaceholder.typicode.com/users").json()

        for user_data in users:
            first_name = user_data['name'].split()[0]
            last_name = user_data['name'].split()[1]

            home_phone_number = generate_phone_number()
            cell_phone_number = generate_phone_number()
            work_phone_number = generate_phone_number()
            
            email = user_data['email']

            birthday = fake.date_between(start_date=date(1940, 1, 1), end_date=date(2000, 1, 1))
            
            today = date.today()
            age = today.year - birthday.year

            if today.month < birthday.month:
                age -= 1

            contact_serializer = ContactCreateSerializer(data={
                "user":user.id,
                "first_name":first_name,
                "last_name":last_name,
                "email":email,
                "birthday": birthday,
                "age": age,
                "home_phone_number":home_phone_number,
                "cell_phone_number":cell_phone_number,
                "work_phone_number":work_phone_number,
            })

            if contact_serializer.is_valid():
                contact_serializer.save()
            else:
                print(contact_serializer.errors)
