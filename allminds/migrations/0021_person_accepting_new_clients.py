# Generated by Django 2.2.7 on 2019-11-25 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allminds', '0020_merge_20191115_1618'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='accepting_new_clients',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
