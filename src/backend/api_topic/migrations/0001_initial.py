# Generated by Django 4.1 on 2022-10-11 11:08

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=50, unique=True)),
                ('description', models.TextField()),
            ],
            options={
                'db_table': 'topics',
                'ordering': ('-created_at',),
            },
        ),
    ]