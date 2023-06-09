# Generated by Django 3.2.8 on 2022-10-23 11:42

import api_course.models.attachment
import api_course.models.course
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api_topic', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(blank=False, max_length=255, null=True, upload_to=api_course.models.attachment.upload_path)),
                ('path', models.CharField(default=None, max_length=255, null=True)),
                ('file_type', models.CharField(max_length=255, blank=False)),
                ('original_name', models.CharField(max_length=255, blank=False)),
                ('length', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'attachments',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'chapters',
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField(blank=True, null=True)),
                ('attachment', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api_course.attachment')),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='api_course.chapter')),
                ('previous_lesson', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api_course.lesson')),
            ],
            options={
                'db_table': 'lessons',
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
                ('summary', models.CharField(max_length=255)),
                ('slug', models.SlugField(null=True, unique=True)),
                ('description', models.TextField()),
                ('background', models.FileField(blank=True, null=True, upload_to=api_course.models.course.upload_path)),
                ('cost', models.FloatField(default=0)),
                ('status', models.CharField(choices=[('DRAFT', 'DRAFT'), ('PUBLISHED', 'PUBLISHED'), ('DEACTIVATED', 'DEACTIVATED')], default='DRAFT', max_length=50)),
                ('certificate_frame', models.TextField()),
                ('topics', models.ManyToManyField(blank=True, null=True, related_name='courses', to='api_topic.Topic')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api_user.user')),
            ],
            options={
                'db_table': 'courses',
                'ordering': ('-created_at',),
            },
        ),
        migrations.AddField(
            model_name='chapter',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='api_course.course'),
        ),
        migrations.AddField(
            model_name='chapter',
            name='previous_chapter',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api_course.chapter'),
        ),
    ]
