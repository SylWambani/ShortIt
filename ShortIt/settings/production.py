import os
import dj_database_url
from .commonsettings import *


DEBUG = True

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ['shortit-6b2j.onrender.com', 'localhost']

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ['DATABASE_URL'],
        conn_max_age=600,
        ssl_require=True
    )
}

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "https://sylwambani.github.io",
    "https://shortit-6b2j.onrender.com",
]

CSRF_TRUSTED_ORIGINS = [
    "https://sylwambani.github.io",
    "https://shortit-6b2j.onrender.com",
]

CORS_ALLOW_CREDENTIALS = True
