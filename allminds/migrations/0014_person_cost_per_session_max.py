# Generated by Django 2.2.7 on 2019-11-14 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0013_auto_20191113_1901'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='cost_per_session_max',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
