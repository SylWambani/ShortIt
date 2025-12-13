from django.utils import timezone
from rest_framework import serializers
from .models import Url

class UrlDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Url
        fields=['id', 'long_url', 'short_code', 'created_at']

class ShortUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = ['id','long_url']