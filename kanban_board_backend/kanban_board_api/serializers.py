from rest_framework import serializers
from .models import ProjectInfo, Ticket, SprintInfo


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'title', 'sprint_id', 'description', 'kind',
                  'release_version', 'story_point', 'tag_1', 'tag_2')

    def create(self, validated_data):
        ticket = Ticket(
            title=validated_data['title'],
            sprint_id=validated_data['sprint_id'],
            description=validated_data['description'],
            story_point=validated_data['story_point'],
            kind=validated_data['kind'],
            release_version=validated_data['release_version'],
            tag_1=validated_data['tag_1'],
            tag_2=validated_data['tag_2'],
        )
        ticket.order = Ticket().new_order()
        ticket.save()
        return ticket


class ProjectInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInfo
        fields = ('id', 'project_name',)


class SprintInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SprintInfo
        fields = ("id", 'name', 'is_closed', 'is_active', "project_id")
