from django.utils import timezone
from rest_framework import serializers
from .models import Url

class ShortUrlMixin(serializers.Serializer):
    short_url = serializers.SerializerMethodField()

    def get_short_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(
                f"/shorten-url/s/{obj.short_code}/"
            )
        return obj.short_code

class UrlDetailSerializer(ShortUrlMixin, serializers.ModelSerializer):
    class Meta:
        model=Url
        fields=['id', 'long_url', 'short_code','short_url', 'created_at']
        read_only_fields = ['short_code']


class ShortUrlSerializer(ShortUrlMixin, serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = ['id','long_url', 'short_url']