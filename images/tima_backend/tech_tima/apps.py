from django.apps import AppConfig


class TechTimaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tech_tima'

    def ready(self):
        import tech_tima.signals
