from django.urls import path
from .views import AchievementListView, AchievementDetailView

urlpatterns = [
    path('', AchievementListView.as_view(), name='achievement-list'),
    path('<int:pk>/', AchievementDetailView.as_view(), name='achievement-detail'),
] 