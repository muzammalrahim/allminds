# Generated by Django 2.2.7 on 2019-11-14 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0014_person_cost_per_session_max'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='cost_per_session_min',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
