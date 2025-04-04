from django.urls import path
from .views import (
    EventListView,
    EventDetailView,
    EventCreateView,
    EventUpdateView,
    EventDeleteView,
    EventRegisterView,
    EventCheckInView,
    EventReviewCreateView,
    UserEventsView,
    EventCategoryListView,
    EventTagListView,
)

urlpatterns = [
    path('', EventListView.as_view(), name='event-list'),
    path('categories/', EventCategoryListView.as_view(), name='event-category-list'),
    path('tags/', EventTagListView.as_view(), name='event-tag-list'),
    path('my-events/', UserEventsView.as_view(), name='user-events'),
    path('create/', EventCreateView.as_view(), name='event-create'),
    path('<slug:slug>/', EventDetailView.as_view(), name='event-detail'),
    path('<slug:slug>/update/', EventUpdateView.as_view(), name='event-update'),
    path('<slug:slug>/delete/', EventDeleteView.as_view(), name='event-delete'),
    path('<slug:slug>/register/', EventRegisterView.as_view(), name='event-register'),
    path('<slug:slug>/check-in/', EventCheckInView.as_view(), name='event-check-in'),
    path('<slug:slug>/review/', EventReviewCreateView.as_view(), name='event-review'),
] 