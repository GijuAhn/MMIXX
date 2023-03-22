from django.apps import AppConfig
from django.conf import settings
import pickle
import os


class MusicConfig(AppConfig):
    # path = os.path.join(settings.MODELS, 'models.p')
    name = 'music'
    # MODEL_PATH = Path("model")
    # predictor = Predictor(model_path = )
    default_auto_field = 'django.db.models.BigAutoField'
