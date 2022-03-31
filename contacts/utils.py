import random
from datetime import date
import json
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from users.fake_user_data import fake_user_data
from contacts.models import Contact
from contacts.serializers import ContactCreateSerializer

def generate_phone_number():
    chance_of_existing = random.random()

    if chance_of_existing < .3:
        phone_number = None
    else:
        digits = 10

        phone_number = ''.join([str(random.randint(1,9)) for _ in range(digits)])

    return phone_number

def set_default_contacts():
    user, created = get_user_model().objects.get_or_create(
        email='guest@contax.com',
    )

    if created:
        user.set_password('pass3412')

    user.contacts.all().delete()


    for user_data in fake_user_data:
        first_name = user_data['name'].split()[0]
        last_name = user_data['name'].split()[1]

        home_phone_number = generate_phone_number()
        cell_phone_number = generate_phone_number()
        work_phone_number = generate_phone_number()
        
        email = user_data['email']

        year = random.randint(1950, 2000)
        month = random.randint(1, 12)
        day = random.randint(1, 27)

        birthday = date(year=year,month=month,day=day)
        
        today = date.today()
        age = today.year - birthday.year

        if today.month < birthday.month:
            age -= 1

        notes = user_data.get('notes') or []

        contact_serializer = ContactCreateSerializer(data={
            "user": user,
            "first_name":first_name,
            "last_name":last_name,
            "email":email,
            "birthday": birthday,
            "age": age,
            "home_phone_number":home_phone_number,
            "cell_phone_number":cell_phone_number,
            "work_phone_number":work_phone_number,
            "primary_phone": "CELL",
            "notes": notes
        })

        # print(contact_serializer.initial_data)

        if contact_serializer.is_valid():
            contact = contact_serializer.save(user=user)
            print(contact)
        else:
            print(contact_serializer.errors)
