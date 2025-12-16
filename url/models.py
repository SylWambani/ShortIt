from django.db import models
from django.contrib.auth.models import User
from .utils import create_unique_code


class Url(models.Model):
    long_url = models.TextField()
    short_code = models.CharField(max_length=6, unique=True, blank=False)
    created_at= models.DateTimeField(auto_now_add=True)
    clicks = models.IntegerField(default=0)
    user=models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)

    def save(self, *args, **kwargs):
        if not self.short_code:  # Only generate on first save
            self.short_code = create_unique_code()
        super().save(*args, **kwargs)

