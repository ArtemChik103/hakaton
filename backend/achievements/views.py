from rest_framework import generics
from rest_framework.response import Response

class AchievementListView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        return Response({"message": "Achievement list endpoint"})

class AchievementDetailView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        return Response({"message": "Achievement detail endpoint"}) 