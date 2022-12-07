# Generated by Django 3.2.8 on 2022-11-24 12:21

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AdminReport',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('month', models.DateField()),
                ('total_course', models.BigIntegerField()),
                ('total_user', models.BigIntegerField()),
                ('total_lecturer', models.BigIntegerField()),
            ],
            options={
                'db_table': 'admin_report',
            },
        ),
        migrations.CreateModel(
            name='LecturerReport',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('date_one', models.CharField(max_length=20)),
                ('total_user', models.BigIntegerField()),
                ('total_cost', models.BigIntegerField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api_course.course')),
            ],
            options={
                'db_table': 'lecturer_report',
                'ordering': ('-created_at',),
            },
        ),
    ]
