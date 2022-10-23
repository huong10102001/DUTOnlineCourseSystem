from rest_framework import serializers

from api_topic.models.topic import Topic


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description']
        extra_kwargs = {
            'description': {'required': False},
        }


class TopicShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title']
