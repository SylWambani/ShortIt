from django.urls import path
from rest_framework_nested import routers
from .views import UrlDetailViewSet,ShortUrlViewSet, redirect_short_url


router = routers.DefaultRouter()
router.register('list-urls', UrlDetailViewSet, basename='urls')
router.register('generate', ShortUrlViewSet, basename='generate')


urlpatterns = router.urls+ [
    path('s/<str:short_code>/', redirect_short_url, name='redirect'),
]
