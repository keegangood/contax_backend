release: python -m pip install -r requirements.txt
release: python manage.py makemigrations
release: python manage.py migrate
release: python manage.py populate
web: gunicorn main.wsgi
