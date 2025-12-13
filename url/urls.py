from django.urls import path
from rest_framework_nested import routers
from . import views


router = routers.DefaultRouter()
router.register('list-urls', views.UrlDetailViewSet, basename='urls')
router.register('generate', views.ShortUrlViewSet)


urlpatterns = router.urls
