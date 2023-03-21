from django.db import models

# Create your models here.

class Music(models.Model):
    music = models.FileField()
    image = models.FileField()
    def __str__(self):
        return self.music