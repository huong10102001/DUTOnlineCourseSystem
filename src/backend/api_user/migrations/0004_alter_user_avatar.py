# Generated by Django 3.2.8 on 2022-11-23 06:13

import api_user.models.user
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_user', '0003_alter_account_managers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.FileField(blank=True, null=True, upload_to=api_user.models.user.upload_path),
        ),
    ]