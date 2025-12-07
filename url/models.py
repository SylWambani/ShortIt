from django.db import models
from django.contrib.auth.models import User

class Url(models.Model):
    long_url = models.TextField()
    short_code = models.CharField(max_length=6, unique=True)
    created_at= models.DateTimeField(auto_now_add=True)
    clicks = models.IntegerField(default=0)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
