import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tech_core.settings")
django.setup()

from django.conf import settings
from django.core.mail import send_mail

send_mail(
    subject="Testing",
    message="Hello there 👋, you're lit!",
    from_email=settings.EMAIL_HOST_USER,
    recipient_list=["kiptootitus75@gmail.com"],
    fail_silently=False
)
