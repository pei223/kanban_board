# coding: utf-8

from rest_framework import routers
from .views import ProjectInfoViewSet, TicketViewSet, SprintInfoViewSet

router = routers.DefaultRouter()
router.register(r'ticket', TicketViewSet)
router.register(r'project', ProjectInfoViewSet)
router.register(r'sprint', SprintInfoViewSet)
