from rest_framework import viewsets
from .models import ProjectInfo, Ticket, SprintInfo
from .serializers import ProjectInfoSerializer, TicketSerializer, SprintInfoSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class SprintInfoViewSet(viewsets.ModelViewSet):
    queryset = SprintInfo.objects.all()
    serializer_class = SprintInfoSerializer


class ProjectInfoViewSet(viewsets.ModelViewSet):
    queryset = ProjectInfo.objects.all()
    serializer_class = ProjectInfoSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    @action(detail=False, url_name='active_sprint', methods=['GET'])
    def active_sprint(self, request):
        data = Ticket.objects.active_sprint_tickets()
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data)