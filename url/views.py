from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .models import Url
from .serializer import UrlDetailSerializer, ShortUrlSerializer

class UrlDetailViewSet(ModelViewSet):
    serializer_class = UrlDetailSerializer
    queryset=Url.objects.all()

class ShortUrlViewSet(ModelViewSet):
    serializer_class = ShortUrlSerializer
    queryset=Url.objects.all()
