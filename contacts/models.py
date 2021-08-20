from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator


class Contact(models.Model):

    PHONE_TYPE_CHOICES = (
        ('CELL', 'Cell'),
        ('HOME', 'Home'),
        ('WORK', 'Work')
    )

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    first_name = models.CharField("first_name", max_length=100)
    last_name = models.CharField("last_name", max_length=100)
    age = models.IntegerField("age", blank=True, null=True)
    birthday = models.DateField("birthday", blank=True, null=True)

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    home_phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True, null=True)
    cell_phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True, null=True)
    work_phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True, null=True)
    primary_phone = models.CharField(max_length=4, choices=PHONE_TYPE_CHOICES)

    email_regex = RegexValidator(
        regex=r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')
    email = models.EmailField(
        validators=[email_regex], max_length=254, blank=True, null=True)

    notes = models.JSONField(default=list, blank=True, null=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
