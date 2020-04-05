from django.db import models
from django.db.models import Max
from enum import Enum


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


class SprintInfoQuerySet(models.QuerySet):
    def active_sprint_name(self, project_id: int) -> str or None:
        active_sprint_name = self.values("name").filter(is_active=True, project_id=project_id)
        if len(active_sprint_name) == 0:
            return None
        return active_sprint_name[0]["name"]


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
