from typing import List

from rest_framework import viewsets
from rest_framework import status
from rest_framework.exceptions import ParseError, NotFound

from .models import ProjectInfo, Ticket, SprintInfo
from .serializers import ProjectInfoSerializer, TicketSerializer, SprintInfoSerializer
from rest_framework.decorators import action, api_view
from rest_framework.response import Response


class SprintInfoViewSet(viewsets.ModelViewSet):
    queryset = SprintInfo.objects.all()
    serializer_class = SprintInfoSerializer

    def list(self, request, *args, **kwargs):
        project_id = request.GET.get('project_id')
        if project_id is None:
            raise ParseError('Require project id.')
        sprint_list = SprintInfo.objects.sprint_list(project_id)
        serializer = self.get_serializer(sprint_list, many=True)
        return Response(serializer.data)

    @action(detail=True, url_name='activate', methods=['PUT'])
    def activate(self, request, pk=None):
        """
        スプリントをアクティブにする.
        クローズされている場合もアクティブとする.
        """
        if pk is None:
            raise ParseError('Require sprint id')
        SprintInfo.objects.activate_sprint(pk)
        return Response(data={"message": "updated"}, status=status.HTTP_200_OK)

    @action(detail=False, url_name='close', methods=['PUT'])
    def close(self, request):
        """
        アクティブなスプリントをクローズする.

        parameters
        ---
        project_id
        """
        project_id = request.data.get('project_id')
        if project_id is None:
            raise ParseError('Require project id.')
        SprintInfo.objects.close_sprint(project_id)
        return Response(data={"message": "updated"}, status=status.HTTP_200_OK)


class ProjectInfoViewSet(viewsets.ModelViewSet):
    queryset = ProjectInfo.objects.all()
    serializer_class = ProjectInfoSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    @action(detail=False, url_name='active_sprint', methods=['GET'])
    def active_sprint(self, request):
        """
        アクティブスプリントのチケット一覧を取得.
        """
        project_id = request.GET.get('project_id')
        if project_id is None:
            raise ParseError('Require project id.')
        tickets = Ticket.objects.active_sprint_tickets(project_id)
        serializer = self.get_serializer(tickets, many=True)

        sprint_info = SprintInfo.objects.get_active_sprint(project_id)
        return Response(self._arrange_result_json(serializer.data, sprint_info))

    def list(self, request, *args, **kwargs):
        sprint_id = request.GET.get('sprint_id')
        if sprint_id is None:
            raise ParseError('Require sprint id')
        tickets = Ticket.objects.sprint_tickets(sprint_id)
        serializer = self.get_serializer(tickets, many=True)

        sprint_info = SprintInfo.objects.filter(id=sprint_id).first()
        return Response(self._arrange_result_json(serializer.data, sprint_info))

    def _arrange_result_json(self, tickets: List, sprint_info: SprintInfo or None):
        result = {"tickets": tickets}
        if sprint_info is None:
            raise NotFound()
        result["sprint_name"] = sprint_info.name
        result["is_active"] = sprint_info.is_active
        result["is_closed"] = sprint_info.is_closed
        return result
