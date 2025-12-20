from rest_framework.viewsets import GenericViewSet, ModelViewSet
from django.shortcuts import redirect, get_object_or_404
from rest_framework.permissions import AllowAny, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Url
from .serializer import UrlDetailSerializer, ShortUrlSerializer

class UrlDetailViewSet(ModelViewSet):
    serializer_class = UrlDetailSerializer
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_queryset(self):
        return Url.objects.filter(user=self.request.user) 

class ShortUrlViewSet(ModelViewSet):
    serializer_class = ShortUrlSerializer
    #queryset=Url.objects.all() 
    permission_classes=[AllowAny]
    authentication_classes=[JWTAuthentication]

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return Url.objects.filter(user=user)
        return Url.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()
            
        

def redirect_short_url(request, short_code):
    url = get_object_or_404(Url, short_code=short_code)
    url.clicks += 1
    url.save()
    return redirect(url.long_url)       
