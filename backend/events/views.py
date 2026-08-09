from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .parsers import parse_external_it_events

class EventListView(APIView):
    """
    Возвращает список актуальных парсируемых IT-мероприятий и хакатонов
    с прямыми ссылками на внешнюю регистрацию.
    """
    def get(self, request, *args, **kwargs):
        events = parse_external_it_events()
        # Преобразуем датавремя в ISO-строки для REST API
        formatted_events = []
        for idx, item in enumerate(events, 1):
            formatted_events.append({
                "id": idx,
                "title": item["title"],
                "description": item["description"],
                "type": item["event_type"],
                "format": item["format"],
                "city": item["city"],
                "location": item["location"],
                "startDate": item["start_date"].isoformat() if hasattr(item["start_date"], 'isoformat') else str(item["start_date"]),
                "prizePool": item["prize_pool"],
                "organizer": item["organizer"],
                "registrationLink": item["registration_link"],
                "sourceSite": item["source_site"],
                "isLiveParsed": True
            })
        return Response(formatted_events, status=status.HTTP_200_OK)

class EventDetailView(APIView):
    def get(self, request, pk, *args, **kwargs):
        events = parse_external_it_events()
        if 1 <= pk <= len(events):
            item = events[pk - 1]
            return Response({
                "id": pk,
                "title": item["title"],
                "description": item["description"],
                "type": item["event_type"],
                "format": item["format"],
                "city": item["city"],
                "location": item["location"],
                "startDate": item["start_date"].isoformat() if hasattr(item["start_date"], 'isoformat') else str(item["start_date"]),
                "prizePool": item["prize_pool"],
                "organizer": item["organizer"],
                "registrationLink": item["registration_link"],
                "sourceSite": item["source_site"]
            })
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)