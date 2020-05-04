from django.db import models
from django.db.models import Max, QuerySet
from enum import Enum

from rest_framework.exceptions import NotFound, ValidationError, MethodNotAllowed


class TicketStatus(Enum):
    TODO = 1
    PENDING = 2
    IN_PROGRESS = 3
    REVIEWING = 4
    DONE = 5


class TicketQuerySet(models.QuerySet):
    def max_order_num(self):
        result = self.aggregate(Max('order'))
        if not result['order__max']:
            return 0
        return result['order__max']

    def active_sprint_tickets(self, project_id: int):
        return self.filter(sprint_id__is_active=True, sprint_id__project_id=project_id)

    def sprint_tickets(self, sprint_id: int):
        return self.filter(sprint_id=sprint_id)


class SprintInfoQuerySet(models.QuerySet):
    def get_active_sprint(self, project_id: int):
        active_sprint = self.filter(is_active=True, project_id=project_id)
        if len(active_sprint) == 0:
            return None
        return active_sprint[0]

    def sprint_list(self, project_id: int) -> QuerySet:
        result = self.filter(project_id=project_id)
        return result

    def close_sprint(self, project_id: int):
        active_sprint = self.get_active_sprint(project_id)
        if active_sprint is None:
            raise NotFound(f"Project {project_id} does not exist active sprint.")
        active_sprint.is_closed = True
        active_sprint.is_active = False
        active_sprint.save()

    def activate_sprint(self, sprint_id: int):
        sprint_info = self.filter(id=sprint_id).first()
        if sprint_info is None:
            raise NotFound(f"Sprint {sprint_id} is not found.")
        active_sprint = self.get_active_sprint(sprint_info.project_id)
        if active_sprint is not None:
            raise MethodNotAllowed("Other sprint is already activated.")
        sprint_info.is_active = True
        sprint_info.is_closed = False
        sprint_info.save()


class ProjectInfo(models.Model):
    project_name = models.CharField(max_length=200)


class SprintInfo(models.Model):
    name = models.CharField(max_length=200, unique=True)
    is_active = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)
    project_id = models.ForeignKey(ProjectInfo, on_delete=models.CASCADE)

    objects = SprintInfoQuerySet.as_manager()


class Ticket(models.Model):
    title = models.CharField(max_length=200)
    sprint_id = models.ForeignKey(SprintInfo, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    story_point = models.PositiveSmallIntegerField()
    kind = models.CharField(max_length=100)
    order = models.IntegerField()
    release_version = models.CharField(max_length=100, blank=True)
    tag_1 = models.CharField(max_length=100, blank=True)
    tag_2 = models.CharField(max_length=1000, blank=True)
    status = models.IntegerField(default=TicketStatus.TODO.value)

    objects = TicketQuerySet.as_manager()
