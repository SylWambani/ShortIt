from .commonsettings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
 
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-d2(=z45+cuq51&o!7p8n^gk84f$s6_5p8!-b4x-0i#+$5er$d%'

CORS_ALLOW_ALL_ORIGINS = True

# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ShortIt',
        'HOST': '127.0.0.1',
        'USER': 'root',
        'PASSWORD': 'Wambani2000.',
        'PORT': '3306',
    }
}