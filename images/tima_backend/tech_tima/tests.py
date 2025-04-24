# tests.py
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Profile, Address
from PIL import Image
import tempfile

User = get_user_model()

class UserAuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('user-register')
        self.login_url = reverse('token_obtain_pair')  # JWT
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'TestPass123!'
        }

    def test_user_registration(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())

    def test_user_login_jwt(self):
        self.client.post(self.register_url, self.user_data)
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'TestPass123!'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.access_token = response.data['access']


class ProfileTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', password='securepass123')
        self.token_url = reverse('token_obtain_pair')
        self.profile_url = reverse('profile-list-create')

        # Login to get JWT
        response = self.client.post(self.token_url, {
            'username': 'john',
            'password': 'securepass123'
        })
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def generate_photo_file(self):
        image = Image.new('RGB', (100, 100), 'blue')
        tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        image.save(tmp_file, format='JPEG')
        tmp_file.seek(0)
        return tmp_file

    def test_create_profile_with_picture(self):
        tmp_file = self.generate_photo_file()
        data = {
            'user': self.user.id,
            'bio': 'Hello!',
            'birth_date': '1990-01-01',
            'website': 'https://john.com',
            'social_media_links': '{"twitter": "https://twitter.com/john"}',
            'is_active': True,
            'is_verified': True,
            'profile_picture': tmp_file,
        }
        response = self.client.post(self.profile_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Profile.objects.filter(user=self.user).exists())


class AddressTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='alice', password='pass1234')
        self.token_url = reverse('token_obtain_pair')
        self.address_url = reverse('address-list-create')

        # Login to get JWT
        response = self.client.post(self.token_url, {
            'username': 'alice',
            'password': 'pass1234'
        })
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_create_address(self):
        data = {
            'user': self.user.id,
            'street': '123 Main St',
            'city': 'Springfield',
            'state': 'IL',
            'country': 'USA',
            'postal_code': '62704'
        }
        response = self.client.post(self.address_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Address.objects.filter(user=self.user).exists())

