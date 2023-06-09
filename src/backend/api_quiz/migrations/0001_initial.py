# Generated by Django 3.2.8 on 2022-11-19 05:20

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api_process', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=250)),
                ('description', models.TextField()),
                ('threshold', models.FloatField(default=0)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='api_course.lesson')),
            ],
            options={
                'db_table': 'quizzes',
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='QuizResult',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('threshold', models.FloatField(validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(1.0)])),
                ('is_passed', models.BooleanField(default=False)),
                ('submit_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('process_lesson', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='quiz_results', to='api_process.processlesson')),
                ('quiz', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='quiz_results', to='api_quiz.quiz')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_results', to='api_user.user')),
            ],
            options={
                'db_table': 'quiz_results',
                'ordering': ('-submit_at',),
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('score', models.IntegerField(default=10)),
                ('level', models.CharField(choices=[('HIGH', 'HIGH'), ('MEDIUM', 'MEDIUM'), ('LOW', 'LOW')], default='MEDIUM', max_length=50)),
                ('question_type', models.CharField(choices=[('MULTIPLE_CHOICE', 'MULTIPLE_CHOICE'), ('SINGLE_CHOICE', 'SINGLE_CHOICE')], default='SINGLE_CHOICE', max_length=50)),
                ('order', models.IntegerField(default=1)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='api_quiz.quiz')),
            ],
            options={
                'db_table': 'questions',
                'ordering': ('order', 'quiz'),
            },
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('content', models.CharField(max_length=255)),
                ('is_correct', models.BooleanField(default=False)),
                ('order', models.IntegerField(default=1)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='api_quiz.question')),
            ],
            options={
                'db_table': 'answers',
                'ordering': ('order', 'question'),
            },
        ),
    ]
