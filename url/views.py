from rest_framework.viewsets import GenericViewSet, ModelViewSet
from django.shortcuts import redirect, get_object_or_404
from .models import Url
from .serializer import UrlDetailSerializer, ShortUrlSerializer

class UrlDetailViewSet(ModelViewSet):
    serializer_class = UrlDetailSerializer
    queryset=Url.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class ShortUrlViewSet(ModelViewSet):
    serializer_class = ShortUrlSerializer
    queryset=Url.objects.all()

def redirect_short_url(request, short_code):
    url = get_object_or_404(Url, short_code=short_code)
    url.clicks += 1
    url.save()
    return redirect(url.long_url)       
