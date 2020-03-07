from django.contrib import admin
from .models import ProjectInfo, Ticket


@admin.register(ProjectInfo)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    pass
