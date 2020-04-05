from rest_framework import viewsets
from rest_framework.exceptions import ParseError

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
        project_id = request.GET.get('project_id')
        if project_id is None:
            raise ParseError('Require project id.')
        data = Ticket.objects.active_sprint_tickets(project_id)
        serializer = self.get_serializer(data, many=True)
        result = {"tickets": serializer.data}
        sprint_name = SprintInfo.objects.active_sprint_name(project_id)
        if sprint_name:
            result["sprint_name"] = sprint_name
        return Response(result)
