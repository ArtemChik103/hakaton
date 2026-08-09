from rest_framework import generics
from rest_framework.response import Response

class NewsListView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        return Response({"message": "News list endpoint"})

class NewsDetailView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        return Response({"message": "News detail endpoint"})