from django.urls import path
from .views import RegisterAPIView, LoginAPIView, ProfileListCreateView, ProfileDetailView, AddressListCreateView, \
    AddressDetailView, ProfileMeView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/register/', RegisterAPIView.as_view(), name='user-register'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profiles/me/', ProfileMeView.as_view(), name='profile-me'),

    path('profiles/', ProfileListCreateView.as_view(), name='profile-list-create'),
    path('profiles/<int:pk>/', ProfileDetailView.as_view(), name='profile-detail'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('addresses/', AddressListCreateView.as_view(), name='address-list-create'),
    path('addresses/<int:pk>/', AddressDetailView.as_view(), name='address-detail'),
]
