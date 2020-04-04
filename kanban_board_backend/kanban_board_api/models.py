from django.db import models
from django.db.models import Max


class TicketQuerySet(models.QuerySet):
    def max_order_num(self):
        result = self.aggregate(Max('order'))
        if not result['order__max']:
            return 0
        return result['order__max']

    def active_sprint_tickets(self):
        return self.filter(sprint_id__is_active=True)


class ProjectInfo(models.Model):
    project_name = models.CharField(max_length=200)


class SprintInfo(models.Model):
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)
    project_id = models.ForeignKey(ProjectInfo, on_delete=models.CASCADE)


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

    objects = TicketQuerySet.as_manager()
