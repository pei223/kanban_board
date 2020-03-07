from django.db import models
from django.db.models import Max


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

    def new_order(self):
        result = Ticket.objects.all().aggregate(Max('order'))
        if not result['order__max']:
            return 1
        return result['order__max'] + 1

    def active_sprint_tickets(self):
        return Ticket.objects.all().filter(sprint_id__is_active=True)
