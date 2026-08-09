from django.db import models

class Event(models.Model):
    EVENT_TYPES = (
        ('hackathon', 'Хакатон'),
        ('meetup', 'Митап'),
        ('conference', 'Конференция'),
        ('workshop', 'Воркшоп'),
    )
    EVENT_FORMATS = (
        ('online', 'Онлайн'),
        ('offline', 'Офлайн'),
        ('hybrid', 'Гибридный'),
    )

    title = models.CharField(max_length=255, verbose_name="Название")
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    description = models.TextField(verbose_name="Описание")
    event_type = models.CharField(max_length=30, choices=EVENT_TYPES, default='hackathon')
    format = models.CharField(max_length=20, choices=EVENT_FORMATS, default='offline')
    city = models.CharField(max_length=100, blank=True, default='')
    location = models.CharField(max_length=255, blank=True, default='')
    start_date = models.DateTimeField(verbose_name="Дата начала")
    end_date = models.DateTimeField(verbose_name="Дата окончания", null=True, blank=True)
    prize_pool = models.CharField(max_length=100, blank=True, default='')
    organizer = models.CharField(max_length=255, blank=True, default='')
    registration_link = models.URLField(verbose_name="Прямая ссылка на регистрацию", max_length=500)
    source_site = models.CharField(max_length=100, blank=True, default='')
    is_live_parsed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title