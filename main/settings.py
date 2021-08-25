from pathlib import Path
import decouple
import django_heroku
import psycopg2
import dj_database_url
from corsheaders.defaults import default_headers


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = decouple.config('DJANGO_DEBUG')

# set SECRET_KEY based on value of DEBUG
if DEBUG:
    SECRET_KEY = decouple.config('DJANGO_SECRET_KEY_DEVELOPMENT')
else:
    SECRET_KEY = decouple.config('DJANGO_SECRET_KEY_PRODUCTION')



STATIC_ROOT = BASE_DIR / 'static'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',
    'whitenoise',

    'users',
    'contacts',

]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'main.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'main.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
}


db_from_env = dj_database_url.config(conn_max_age=600)
DATABASES['default'].update(db_from_env)

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Secret for encoding User refresh tokens
REFRESH_TOKEN_SECRET = decouple.config('DJANGO_REFRESH_TOKEN_SECRET')

# Use custom user model for authentication
AUTH_USER_MODEL = 'users.User'

# define default authentication method in DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'users.authentication.SafeJWTAuthentication'
    ],

     'DEFAULT_RENDERER_CLASSES': (
        'djangorestframework_camel_case.render.CamelCaseJSONRenderer',
        'djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer',
        # Any other renders
    ),

    'DEFAULT_PARSER_CLASSES': (
        # If you use MultiPartFormParser or FormParser, we also have a camel case version
        'djangorestframework_camel_case.parser.CamelCaseFormParser',
        'djangorestframework_camel_case.parser.CamelCaseMultiPartParser',
        'djangorestframework_camel_case.parser.CamelCaseJSONParser',
        # Any other parsers
    ),
}

# define refresh token lifetime
REFRESH_TOKEN_EXPIRY = {
    'days': 7,
    'hours': 0,
    'minutes': 0,
    'seconds': 0
}

# define refresh token lifetime
ACCESS_TOKEN_EXPIRY = {
    'days': 0,
    'hours': 10,
    'minutes': 0,
    'seconds': 10
}

# to accept cookies via axios
CORS_ALLOW_CREDENTIALS = True

CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE='None'
CSRF_COOKIE_SECURE = True

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://contaxapp.herokuapp.com',
    'https://contaxapp.netlify.app',
    # other allowed origins...
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://contaxapp.herokuapp.com',
    'contaxapp.netlify.app',
    # other allowed origins...
]

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    'https://contaxapp.herokuapp.com',
    '.netlify.app',
    # other allowed hosts...
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    'refresh_token',
    'withcredentials',
    'access-control-allow-origin',
]

django_heroku.settings(locals())